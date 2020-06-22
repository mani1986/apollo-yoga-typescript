import { ModuleContext } from '@graphql-modules/core';
import UnauthorizedError from 'errors/UnauthorizedError';
import UnauthenticatedError from 'errors/UnauthenticatedError';

export default class AuthMiddleware {
  // This function is called with resolversComposition from the graphql-modules library.
  static isAuthenticated() {
    return (next: Function) => {
      return async (root: any, args: any, context: ModuleContext, info: any) => {
        if (!context.user) {
          throw new UnauthenticatedError();
        }

        return next(root, args, context, info);
      };
    };
  }

  // This function is called with resolversComposition from the graphql-modules library.
  static hasRole(roles:string[]) {
    return (next: Function) => {
      return async (root: any, args: any, context: ModuleContext, info: any) => {
        if (roles.indexOf(context.user.role) === -1) {
          throw new UnauthorizedError()
        }

        return next(root, args, context, info)
      }
    }
  }

  // This function is called with resolversComposition from the graphql-modules library.
  static hasPermission(permission:string) {
    return (next: Function) => {
      return async (root: any, args: any, context: ModuleContext, info: any) => {
        // @todo Implement
        return next(root, args, context,)
      }
    }
  }
}
