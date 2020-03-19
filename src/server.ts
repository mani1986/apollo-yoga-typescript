import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers/Resolvers";
import _ from 'lodash'
import auth from './lib/auth';

const typeDefs = "./src/schema.graphql";

const context: any = async ({ req }) => {
  const token = _.get(req, "headers.authorization", null);
  const user = token ? await auth.getUser(token) : null;

  return { ...req, user, token };
};

function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context
  });
}

export default createServer;
