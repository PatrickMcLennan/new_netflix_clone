import { GraphQLClient } from 'graphql-request';

export const nodeGraphqlClient = new GraphQLClient(`http://localhost:4000`);
