// import redis from 'promise-redis';
import redis from 'redis';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, `../.env`) });

export const redisClient = redis.createClient({
  host: `redis`,
  port: Number(process.env.REDIS_PORT)
});

redisClient.on(`error`, err => console.error(err));
