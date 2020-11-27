import { GraphQLModule } from '@graphql-modules/core';
import AuthMiddleware from 'middleware/AuthMiddleware';
import { CommonModule } from 'modules/common/index';
import { UserRole } from '@models';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { getContext as context } from '../../lib/Context';
import { UserResponse} from './resolvers/Response'

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const loadedFiles = loadFilesSync(`${__dirname}/schema/*.graphql`);

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
  typeDefs: mergeTypeDefs([...loadedFiles]),
  resolvers: {
    Query,
    Mutation,
    UserResponse
  },
  context
});
