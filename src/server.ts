import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/Resolvers'

const typeDefs = './src/schema.graphql'

const context: any = async req => {
    return { ...req }
}

function createServer() {
    return new GraphQLServer({
        typeDefs,
        resolvers,
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context
    })
}

export default createServer;
