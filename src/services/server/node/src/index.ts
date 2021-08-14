
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express  from 'express';
import session from 'express-session';
import cors from 'cors';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import redis from 'redis'

import { SESSION_SECRET } from './config';
import { UserProfileResolver } from './resolvers/user.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { postgresConnect } from './services/db.service';

const main = async () => {

  const schema = await buildSchema({
    resolvers: [ UserProfileResolver, AuthResolver ]
  });

  const apollo = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });
  const app = express();

  const RedisStore = connectRedis(session);
  let redisClient = redis.createClient("http://redis:6379/");
  app.use(session({
    store: new RedisStore({ client: redisClient as any }),
    name: 'session',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000*60*60*24*7*365
    }
  }));
  console.log('redis connection established');

  app.use(express.json());
  app.use(cors());

  apollo.applyMiddleware({ app });

  app.listen(5001, () => {
    console.log('server started');
  });

  postgresConnect();

}

main();
