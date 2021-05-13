import { UserInputError } from 'apollo-server-errors';
import { Knex } from 'knex';
import { RedisClient } from 'redis';
import { CreateUserInput, LoginInput, Role } from '../../types/generated.types';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../constants';
import { config } from 'dotenv';

config({ path: `../../.env` }); // potentially need to go up another level "../"

/**
 * Bcrypt guide for passwords
 * @see https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt
 */

export const authResolvers = {
  login: async (
    _parent: any,
    { userCreds }: { userCreds: LoginInput },
    { db, redis }: { db: Knex; redis: RedisClient }
  ) => {
    if (!userCreds?.email?.length || !userCreds?.password?.length)
      return new UserInputError(`No email or password was sent`);

    const { email, password } = userCreds;

    // Make sure values have been passed
    if (!email.length && !password.length) return new UserInputError(`You need an email and a password to sign in`);
    if (!email.length || !password.length)
      throw new UserInputError(`You need a ${!email.length ? `email` : `password`} to log in`);

    const user = await db.from(`users`).where({ email: userCreds.email });
    console.log(user);
    if (!user) throw new UserInputError(`${userCreds.email} does not exist -- have you created an account yet?`);
  },

  createUser: async (
    _parent: any,
    { newUser }: { newUser: CreateUserInput },
    { db, redis }: { db: Knex; redis: RedisClient }
  ) => {
    // Ensure an existing email isn't in the DB
    const emailExists = db.from(`users`).where({ email: newUser.email });
    if (emailExists) throw new UserInputError(`${newUser.email} already exists`);

    // Ensure required fields are filled
    const fields = Object.entries(newUser);
    const emptyFields = fields.reduce((all: string[], [key, value]: [string, string]) => {
      return !value.length ? [...all, key] : all;
    }, []);
    if (emptyFields.length)
      throw new UserInputError(
        emptyFields.length >= 2
          ? `${emptyFields.splice(emptyFields.length - 2, 0, `and`).toString()} are required`
          : `${emptyFields[0]} is required`
      );

    // User is unique and fields verified

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(newUser.password, salt);
    Object.assign(newUser, { role: newUser.email === process.env.ADMIN_EMAIL ? Role.Admin : Role.User });
    Object.assign(newUser, { password: hash });

    db(`users`).insert(newUser);

    return redis.set(newUser.email, Date.now().toString());
  }
};
