import { GraphQLModule } from '@graphql-modules/core';
import _ from 'lodash'

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const loadedFiles = loadFilesSync(`${__dirname}/schema/*.graphql`);

export interface CommonModuleConfig {
}

export const CommonModule:any = new GraphQLModule<CommonModuleConfig, {}, {}>({
  typeDefs: mergeTypeDefs([...loadedFiles]),
});