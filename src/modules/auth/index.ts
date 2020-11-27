import { GraphQLModule } from '@graphql-modules/core';
import { CommonModule } from '../common';
import { getContext as context } from 'lib/Context';
import { UserModule } from 'modules/user';
import { Query } from '../user/resolvers/Query';
import { Mutation } from './resolvers/Mutation';

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const loadedFiles = loadFilesSync(`${__dirname}/schema/*.graphql`);

export const AuthModule = new GraphQLModule({
  imports: [CommonModule, UserModule],
  providers: [],
  typeDefs: mergeTypeDefs([...loadedFiles]),
  resolvers: {
    Query,
    Mutation
  },
  context,
});
