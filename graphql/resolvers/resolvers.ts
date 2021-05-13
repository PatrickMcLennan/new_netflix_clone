import { authResolvers } from './auth.resolvers';
import { imageResolvers } from './image.resolvers';
import { userResolvers } from './user.resolvers';

export const resolvers = {
  Query: {
    ...userResolvers,
    ...imageResolvers
  },
  Mutation: {
    ...authResolvers
  }
};
