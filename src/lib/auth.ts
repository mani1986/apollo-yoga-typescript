import _ from "lodash";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import moment from "moment";
import { randomBytes } from "crypto";
import { promisify } from "util";

import UserModel from "../models/User";
import TokenModel, { IToken } from "../models/Token";
import AuthenticationError from "../errors/AuthenticationError";
import mail from "./mail";

const SECRET = process.env.SECRET || "demo"; // @todo Change this
const TOKEN_VALIDITY_MINUTES = process.env.TOKEN_VALIDITY_MINUTES || 180; // @todo Change this
const PASSWORD_RESET_VALIDITY_MINUTES =
  parseInt(process.env.PASSWORD_RESET_VALIDITY_MINUTES) || 30;

class auth {
  static async login(username, password) {
    const user = await UserModel.findOne({ email: username });

    if (!user || !auth.verifyPassword(password, user.hashedPassword)) {
      throw new AuthenticationError();
    }

    const token = await auth.createToken(user);

    return {
      token: token.token,
      user: _.pick(user, "id", "fullName", "email")
    };
  }

  static signToken(user) {
    const token = jwt.sign({ userId: user._id }, SECRET);

    return token;
  }

  static getRandomPassword(len = 8) {
    return Math.random()
      .toString(36)
      .slice(len * -1);
  }

  static async createToken(user): Promise<IToken> {
    const token = this.signToken(user);

    return await TokenModel.create({
      userId: user._id,
      token,
      validUntil: moment().add(TOKEN_VALIDITY_MINUTES, "minutes")
    });
  }

  static async createUser(fullName, email, hashedPassword) {
    try {
      const user = await UserModel.create({ fullName, email, hashedPassword });

      return user;
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        throw new Error("user already exists");
      }

      throw error;
    }
  }

  static async getUser(headerToken) {
    let token;
    try {
      token = jwt.verify(headerToken, SECRET);
      const user = await this.userQuery(token.userId);

      return _.pick(user, ["id", "fullName", "email"]);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static verifyPassword(input, hashed) {
    const res = bcrypt.compareSync(input, hashed);

    return res;
  }

  static async hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static async userQuery(userId) {
    return await UserModel.findOne({ _id: userId });
  }

  static async requestReset(email: String) {
    const user = await UserModel.findOne({ email });

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

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry.toDate();
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
  static async setPasswordFromToken(resetToken: String, newPassword: String) {
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiry: { $gte: Date.now() - PASSWORD_RESET_VALIDITY_MINUTES }
    });

    if (!user) {
      throw new Error('invalid_token');
    }

    user.hashedPassword = await this.hashPassword(newPassword)
    user.resetToken = null
    user.resetTokenExpiry = null
    user.save()


    return this.signToken(user)
  }
}

export default auth;
