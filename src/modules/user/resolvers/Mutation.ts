import { UserRole, MutationResolvers, MutationUpdateUserArgs, MutationDeleteUserArgs, MessageResponse } from '@models';
import { ModuleContext } from '@graphql-modules/core';
import { UserModel, User } from '../../../models/User';
import { Types } from 'mongoose';

export const Mutation: MutationResolvers = {
  async updateUser(
    root: any,
    args: MutationUpdateUserArgs,
    context: ModuleContext,
  ): Promise<any> {
    if (context.user._id.toString() === args.id) {
      throw new Error('self_edit');
    }

    const user = await UserModel.findByIdAndUpdate(
      { _id: args.id, company: context.user.company },
      { profile: args.input.profile, role: args.input.role, },
      { new: true }
    );

    return user
  },

  async deleteUser(root: any, args: MutationDeleteUserArgs, context: ModuleContext): Promise<MessageResponse> {
    if (context.user.role === UserRole.Manager) {
      throw new Error('unauthorized');
    }

    await UserModel.deleteOne({ company: context.user.company, _id: args.id });

    return {
      message: 'success',
    };
  },
};
