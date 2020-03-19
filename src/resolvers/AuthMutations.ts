import _ from "lodash";

import Context from "./Context";
import ResolverMap from "./ResolverMap";
import UserModel from "../models/User";
import TokenModel from "../models/Token";
import auth from "../lib/auth";

const AuthMutations: ResolverMap = {
  async login(parent, args, context: Context) {
    return await auth.login(args.username, args.password)
  },

  async logout(parent, args, context: Context) {
    await TokenModel.deleteOne({ token: context.token });

    return {
      message: "Success"
    };
  },

  async logoutAll(parent, args, context: Context) {
    await TokenModel.deleteOne({ userId: context.user._id });

    return {
      message: "Success"
    };
  },

  async setPassword(parent, args, context: Context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    UserModel.updateOne(
      {
        _id: context.user._id
      },
      {
        hashedPassword: auth.hashPassword(args.newPassword)
      }
    );

    return {
      message: "Success"
    };
  },

  async setPasswordFromToken(parent, args) {
    return {
      message: "Success"
    };
  },

  async forgotPassword(parent, args) {
    return {
      message: "Success"
    };
  }
};

export default AuthMutations;
