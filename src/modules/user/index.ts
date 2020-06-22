import { GraphQLModule } from '@graphql-modules/core';
import { loadSchemaFiles, loadResolversFiles } from 'graphql-toolkit';
import AuthMiddleware from 'middleware/AuthMiddleware';
import { CommonModule } from 'modules/common/index';
import { UserRole } from '@models';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { context } from '../../lib/context';
import { UserResponse} from './resolvers/Response'

export const UserModule = new GraphQLModule<any, any, any>({
  imports: [CommonModule],
  providers: [],
  resolversComposition: {
    // Queries
    'Query.getUsers': [AuthMiddleware.isAuthenticated(), AuthMiddleware.hasRole([UserRole.Admin])],
    'Query.currentUser': [AuthMiddleware.isAuthenticated()],
    'Query.getStatus': [AuthMiddleware.isAuthenticated()],

    // Mutations
    'Mutation.updateUser': [AuthMiddleware.isAuthenticated(), AuthMiddleware.hasRole([UserRole.Admin])],
    'Mutation.deleteUser': [AuthMiddleware.isAuthenticated(), AuthMiddleware.hasRole([UserRole.Admin])],
  },
  typeDefs: loadSchemaFiles(__dirname + '/schema/'),
  resolvers: {
    Query,
    Mutation,
    UserResponse
  },
  context
});
