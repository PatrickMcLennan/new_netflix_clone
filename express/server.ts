import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from '../graphql/typeDefs/typeDefs';
import { resolvers } from '../graphql/resolvers/resolvers';
import knexInstance from '../knexfile';
import path from 'path';

import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../../../.env`) });

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db: knexInstance
    })
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 });
  console.log(`App is running on port 4000`);
}

startServer();
