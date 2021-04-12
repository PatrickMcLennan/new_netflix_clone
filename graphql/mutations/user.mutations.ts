import { Knex } from 'knex';
import { Role } from '../../types/generated.types';

const me = {
  id: 1,
  firstName: `Patrick`,
  lastName: `McLennan`,
  email: `patrick.a.mclennan@gmail.com`
};

export const userMutations = {
  login: (_parent: any, _args: any, _context: any) => me,
  createUser: (_parent: any, { newUser }: any, { db }: { db: Knex }) => {
    Object.assign(newUser, { role: newUser.email === `patrick.a.mclennan@gmail.com` ? Role.Admin : Role.User });
    return me;
  }
};
