import { GraphQLServer } from "graphql-yoga";
import _ from "lodash";
import auth from "./lib/auth";
import { Log } from "./models/Log";
import { AppModule } from "modules/app";
import { ModuleContext } from "@graphql-modules/core";

const context = async ({ request }: any): Promise<ModuleContext> => {
  const accessToken = _.get(request, "headers.authorization", null);
  const user = accessToken ? await auth.getUser(accessToken) : null;

  if (user) {
    // Log.create({ user: user._id, title: "Test" });
  }

  return { req: request, user, accessToken, injector: null } as ModuleContext;
};

const { schema } = AppModule.forRoot({});

function createServer() {
  return new GraphQLServer({
    schema,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context,
  });
}

export default createServer;
