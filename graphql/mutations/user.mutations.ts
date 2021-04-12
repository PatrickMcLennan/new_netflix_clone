const me = {
  id: 1,
  firstName: `Patrick`,
  lastName: `McLennan`,
  email: `patrick.a.mclennan@gmail.com`
};

export const userMutations = {
  login: (_parent: any, _args: any, _context: any) => me,
  createUser: (_parent: any, _args: any, _context: any) => me
};
