import _ from 'lodash';
import { User } from 'models/User';
import { ModuleContext } from '@graphql-modules/core';
import auth from '../lib/auth';

export type ContextType = ModuleContext & {
  req: object;
  user: User;
  accessToken: string;
};

export const getContext = async (context: any): Promise<ContextType> => {
  const accessToken = _.get(context, 'req.headers.authorization', null);
  const user = accessToken ? await auth.getUser(accessToken) : null;

  return { ...context, user, accessToken } as ContextType;
};
