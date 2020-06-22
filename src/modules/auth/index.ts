import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles } from 'graphql-toolkit';
import { CommonModule } from '../common';
import { context } from 'lib/context';
import { UserModule } from 'modules/user';
import { Query } from '../user/resolvers/Query';
import { Mutation } from './resolvers/Mutation';

export const AuthModule = new GraphQLModule({
  imports: [CommonModule, UserModule],
  providers: [],
  typeDefs: loadSchemaFiles(__dirname + '/schema/'),
  // resolvers: loadResolversFiles(__dirname + '/resolvers/'),
  resolvers: {
    Query,
    Mutation
  },
  context,
});
