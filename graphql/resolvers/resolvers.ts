import { userMutations } from '../mutations/user.mutations';
import { userResolvers } from './user.resolvers';

export const resolvers = {
  Query: {
    ...userResolvers
  },
  Mutation: {
    ...userMutations
  }
};
