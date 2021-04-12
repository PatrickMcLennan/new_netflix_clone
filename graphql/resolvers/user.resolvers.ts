const me = {
  id: 1,
  firstName: `Patrick`,
  lastName: `McLennan`,
  email: `patrick.a.mclennan@gmail.com`
};

export const userResolvers = {
  getUsers: (_parent: any, _args: any, _context: any) => me
};
