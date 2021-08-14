
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express  from 'express';
import cors from 'cors';

import { UserProfileResolver } from './resolvers/user.resolver';

const main = async () => {

  const schema = await buildSchema({
    resolvers: [UserProfileResolver]
  });

  const apollo = new ApolloServer({ schema });
  const app = express();
  apollo.applyMiddleware({ app });

  app.use(express.json());
  app.use(cors());

  app.listen(5001, () => {
    console.log('server started');
  });

}

main();
