import { GraphQLModule } from '@graphql-modules/core';
import { loadSchemaFiles } from 'graphql-toolkit';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import _ from 'lodash'

export interface CommonModuleConfig {
}

export const CommonModule:any = new GraphQLModule<CommonModuleConfig, {}, {}>({
  typeDefs: [
    DIRECTIVES,
    ...loadSchemaFiles(__dirname + '/schema/'),
  ]
});