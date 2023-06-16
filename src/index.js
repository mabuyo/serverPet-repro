import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PetSource = require('./data.cjs').default;

async function startApolloServer() {
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true
  })
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          PetSource: new PetSource({ cache }),
        },
      };
    },
  });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  startApolloServer();
