import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { resolvers } from '../graphql/resolvers/resolvers';
import knexInstance from '../knexfile';
import path from 'path';
import { typeDefs } from '../graphql/typeDefs/typeDefs';
import cors from 'cors';

import { config } from 'dotenv';
import { redisClient } from '../clients/redis.client';

config({ path: path.resolve(__dirname, `../../../.env`) });

const corsOptions = {
  origin: `http://localhost:3000`
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db: knexInstance,
      redis: redisClient
    })
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 });
  app.use(`/images`, cors(corsOptions), express.static(path.join(__dirname, `../../../images`)));
  app.use(`/fonts`, cors(corsOptions), express.static(path.join(__dirname, `../../../fonts`)));
  console.log(`App is running on port 4000`);
}

startServer();
