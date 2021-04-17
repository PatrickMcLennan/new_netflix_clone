import { UserInputError } from 'apollo-server-errors';
import { Knex } from 'knex';
import { RedisClient } from 'redis';
import { CreateUserInput, LoginInput, Role } from '../../types/generated.types';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../constants';

/**
 * Bcrypt guide for passwords
 * @see https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt
 */

export const authResolvers = {
  login: (_parent: any, { userCreds }: { userCreds: LoginInput }, { db, redis }: { db: Knex; redis: RedisClient }) => {
    console.log(userCreds);
    console.log(db);
    console.log(redis);
  },

  createUser: async (
    _parent: any,
    { newUser }: { newUser: CreateUserInput },
    { db, redis }: { db: Knex; redis: RedisClient }
  ) => {
    // Ensure an existing email isn't in the DB
    const emailExists = db.from(`users`).where({ email: newUser.email });
    if (emailExists) return new UserInputError(`${newUser.email} already exists`);

    // Ensure required fields are filled
    const fields = Object.entries(newUser);
    const emptyFields = fields.reduce((all, [key, value]) => (!value.length ? [...all, key] : all), []);
    if (emptyFields.length)
      return new UserInputError(
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
