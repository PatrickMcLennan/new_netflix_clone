import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    getUsers: User!
  }
`;
