import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers/Resolvers";
import _ from 'lodash'
import auth from './lib/auth';

const typeDefs = "./src/schema.graphql";

const context: any = async (obj:any) => {
  const token = _.get(obj.req, "headers.authorization", null);
  const user = token ? await auth.getUser(token) : null;

  return { req: obj.req, user, token };
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
