import { gql } from 'apollo-server-express';
export const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  type Image {
    name: String!
    url: String!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    role: Role
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input WallpapersInput {
    wallpapers: Image[]!
  }

  type Query {
    getUsers: User!
  }

  type Mutation {
    createUser(newUser: CreateUserInput): User
    login(userCreds: LoginInput): User
    newWallpapers(wallpapers: WallpapersInput)
  }
`;
