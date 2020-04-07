import _ from "lodash";
import jwt from "jsonwebtoken";
import moment from "moment";
import { randomBytes } from "crypto";
import { promisify } from "util";

import AuthenticationError from "../errors/AuthenticationError";
import mail from "./mail";
import { UserDocument, User, AuthToken, AuthTokenKind } from '../models/User';

const SECRET = process.env.SECRET
const TOKEN_VALIDITY_MINUTES = process.env.TOKEN_VALIDITY_MINUTES || 180;
const PASSWORD_RESET_VALIDITY_MINUTES =
  parseInt(process.env.PASSWORD_RESET_VALIDITY_MINUTES) || 30;

class auth {
  static async login(username:string, password:string) {
    const user = await User.findOne({ email: username });

    const res = await  user.comparePassword(password)

    if (!res) {
      throw new AuthenticationError();
    }

    const token = await auth.createToken(user);

    return {
      accessToken: token.accessToken,
      user: _.pick(user, "id", "profile", "email")
    };
  }

  static signToken(user:UserDocument):string {
    const token = jwt.sign({ userId: user._id }, SECRET);

    return token;
  }

  static getRandomPassword(len = 8) {
    return Math.random()
      .toString(36)
      .slice(len * -1);
  }

  static async createToken(user:UserDocument): Promise<AuthToken> {

    let tokenObj:AuthToken = {
      kind: AuthTokenKind.auth,
      deviceId: null,
      accessToken: this.signToken(user),
      validUntil: moment().add(TOKEN_VALIDITY_MINUTES, "minutes").toDate()
    }

    user.tokens.push(tokenObj)
    user.save()

    return tokenObj
  }

  static async createUser(fullName:string, email:string, password:string) {
    try {
      const user = await User.create({ profile: { fullName }, email, password });

      return user;
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("user already exists");
      }

      throw error;
    }
  }

  static async getUser(headerToken:string) {
    let token:any;
    try {
      token = jwt.verify(headerToken, SECRET);
      const user = await this.userQuery(token.userId);

      return _.pick(user, ["id", "profile", "email"]);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async userQuery(userId:string) {
    return await User.findOne({ _id: userId });
  }

  static async requestReset(email:string) {
    const user = await User.findOne({ email });

    if (!user) {
      // We don't tell the user that the email wasn't found. This could be logged. @todo Log
      return true;
    }

    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString("hex");
    const resetTokenExpiry = moment().add(
      PASSWORD_RESET_VALIDITY_MINUTES,
      "minutes"
    );

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiry.toDate();
    user.save();

    // Send email
    mail.send(
      email,
      "Reset your password",
      mail.getSimpleEmail(`
        Your password reset token is here \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}" >Click here to reset </a>
      `)
    );

    return true;
  }

  // @todo Log This?
  static async setPasswordFromToken(passwordResetToken: string, newPassword: string) {
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gte: moment().subtract(PASSWORD_RESET_VALIDITY_MINUTES, 'minutes').toDate() }
    });

    if (!user) {
      throw new Error('invalid_token');
    }

    user.password = newPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.save()


    return this.signToken(user)
  }
}

export default auth;
