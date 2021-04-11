import { ApolloServer } from 'apollo-server-micro';
import { resolvers } from '../../../graphql/resolvers/resolvers';
import { typeDefs } from '../../../graphql/typeDefs/typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // put db connection in here
    return {};
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: `/api/v1/graphql` });
