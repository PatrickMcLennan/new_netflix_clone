import { userResolvers } from './user.resolvers';

export const resolvers = {
  Query: {
    ...userResolvers
  }
};
