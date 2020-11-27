import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { User, UserModel } from '../models/User';
import AuthenticationError from '../errors/AuthenticationError';
import { UserRole } from '@models';
import InvalidTokenError from 'errors/InvalidTokenError';
import MailUtil from './utils/MailUtil';

export const PASSWORD_RESET_VALIDITY_MINUTES = parseInt(process.env.PASSWORD_RESET_VALIDITY_MINUTES) || 30;

class auth {
  static async login(username: string, password: string) {
    const user = await UserModel.findOne({ email: username });

    if (!user) {
      throw new AuthenticationError();
    }

    const res = await user.comparePassword(password);

    if (!res) {
      throw new AuthenticationError();
    }

    const token = await user.createToken()

    return {
      accessToken: token.accessToken,
      user,
    };
  }

  static async loginWithTokenAndSetPassword(token: string, newPassword: string) {
    const user = await UserModel.findOne({ passwordResetToken: token });

    if (!user || moment(user.passwordResetExpires).isAfter(moment())) {
      throw new InvalidTokenError();
    }

    // @todo, Check if token is expired

    user.passwordResetToken = null
    user.passwordResetExpires = null
    user.password = newPassword
    user.save()

    const tokenObj = await user.createToken();

    return {
      accessToken: tokenObj.accessToken,
      user,
    };
  }

  static signToken(user: User) {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET);

    return token;
  }

  static async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: any, salt: any) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, undefined, (err: Error, hash: string) => {
          if (err) {
            return reject(err);
          }
          return resolve(hash);
        });
      });
    });
  }

  static getRandomPassword(len = 8) {
    return Math.random()
      .toString(36)
      .slice(len * -1);
  }

  static async createUser(fullName: string, email: string, password: string, role: UserRole) {
    try {
      const user = await UserModel.create({
        profile: { fullName },
        email,
        password,
        role,
        emailVerified: true,
        dateActive: new Date(),
        tokens: []
      });

      return user;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new Error('user_already_exists');
      }

      throw error;
    }
  }

  static async getUser(headerToken: string): Promise<User> {
    if (!headerToken) {
      return null
    }

    let headerTokenPart = headerToken.replace(/bearer/gi, '').trim()

    if (!headerTokenPart) {
      return null
    }

    let token: any;
    try {
      token = jwt.verify(headerToken.replace(/bearer/gi, '').trim(), process.env.SECRET);
      const user = await this.userQuery(token.userId);

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async userQuery(userId: string): Promise<User> {
    return await UserModel.findOne({ _id: userId });
  }

  static async getPasswordToken () {
    const randomBytesPromisified = promisify(randomBytes);

    return (await randomBytesPromisified(20)).toString('hex');
  }

  static async requestReset(email: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      // We don't tell the user that the email wasn't found. This could be logged. @todo Log
      return true;
    }

    const resetToken = await auth.getPasswordToken()
    const resetTokenExpiry = moment().add(PASSWORD_RESET_VALIDITY_MINUTES, 'minutes');

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiry.toDate();
    user.save();

    MailUtil.sendPasswordRecovery(user)

    return true;
  }

  // @todo Log This?
  static async setPasswordFromToken(passwordResetToken: string, newPassword: string):Promise<any> {
    const user = await UserModel.findOne({
      passwordResetToken,
      passwordResetExpires: { $gte: moment().toDate() },
    });

    if (!user) {
      throw new Error('invalid_token');
    }

    user.password = newPassword;
    user.emailVerified = true;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const tokenObj = await user.createToken();

    return {
      accessToken: tokenObj.accessToken,
      user,
    };
  }
}

export default auth;
