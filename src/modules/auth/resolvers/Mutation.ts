import { MutationResolvers, MutationLoginArgs, LoginResponse, MessageResponse } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import auth from "lib/auth";
import _ from 'lodash'
import { User } from "models/User";

export const Mutation: MutationResolvers = {
  async login(parent:any, args:MutationLoginArgs):Promise<LoginResponse> {
    const res:any = await auth.login(args.username, args.password)

    return {
      accessToken: res.accessToken,
      user: res.user
    }
  },

  // async logout(parent, args, context: Context):Promise<MessageResponse> {
  //   await Token.deleteOne({ token: context.token });

  //   return {
  //     message: "Success"
  //   };
  // },

  // async logoutAll(parent, args, context:Context):Promise<MessageResponse> {
  //   await Token.deleteOne({ userId: context.user._id });

  //   return {
  //     message: "Success"
  //   };
  // },

  async setPassword(parent:any, args:any, context:ModuleContext):Promise<MessageResponse> {
    if (!context.user) {
      throw new Error("unauthenticated");
    }

    User.updateOne(
      {
        _id: context.user._id
      },
      {
        password: args.newPassword
      }
    );

    return {
      message: "Success"
    };
  },

  async setPasswordFromToken(parent:any, args:any) {
    return {
      message: "Success"
    };
  },

  async forgotPassword(parent:any, args:any) {
    // await auth.
    return {
      message: "Success"
    };
  }
}