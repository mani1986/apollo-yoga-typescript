import _ from "lodash";

import Context from "./Context";
import ResolverMap from "./ResolverMap";
import { User, AuthToken } from '../models/User';
import auth from "../lib/auth";

const AuthMutations: ResolverMap = {
  async login(parent, args, context: Context) {
    return await auth.login(args.username, args.password);
  },

  async logout(parent, args, context: Context) {
    const index = context.user.tokens.map((i:AuthToken) => i.accessToken).indexOf(context.accessToken)
    context.user.tokens.splice(1, index)

    return {
      message: "Success",
    };
  },

  async logoutAll(parent, args, context: Context) {
    context.user.tokens = []
    context.user.save()

    return {
      message: "Success",
    };
  },

  async setPassword(parent, args, context: Context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    User.updateOne(
      {
        _id: context.user._id,
      },
      {
        password: args.newPassword,
      }
    );

    return {
      message: "Success",
    };
  },

  async setPasswordFromToken(parent, args) {
    return {
      message: "Success",
    };
  },

  async forgotPassword(parent, args) {
    return {
      message: "Success",
    };
  },
};

export default AuthMutations;
