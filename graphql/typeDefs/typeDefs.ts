import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: User!
  }

  type Mutation {
    createUser(newUser: CreateUserInput): User
    login(userCreds: LoginInput): User
  }
`;
