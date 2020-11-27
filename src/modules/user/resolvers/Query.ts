import { QueryResolvers, UserResponse, StatusResponse } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import { UserModel } from "models/User";
import _ from 'lodash'

export const Query: QueryResolvers = {
  async currentUser(
    root: any,
    args: any,
    context: ModuleContext,
  ): Promise<UserResponse> {
    return context.user
  },

  async getUsers(
    root: any,
    args: any,
    context: ModuleContext,
  ): Promise<Array<any>> {
    const users = await UserModel.find({ company: context.user.company });

    return users
  },

  async getStatus(
    root: any,
    args: any,
    context: ModuleContext,
  ): Promise<StatusResponse> {
    return {
      user: context.user
    };
  },
}