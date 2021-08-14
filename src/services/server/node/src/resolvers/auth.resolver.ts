
import {
  Root, Arg, Field, Query, Authorized,
  InputType, Resolver, FieldResolver, Mutation
} from "type-graphql";
import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';

import { MaxLength } from 'class-validator';
import { IsUsernameNotRegistered } from '../middleware/validation';

import { PASSWORD_SALT } from '../config';
import { dbRegisterUser } from '../services/db.service';

@InputType()
export class RegisterUserInput {

    @Field() @MaxLength(64)
    @IsUsernameNotRegistered({ message: 'username already used'})
    username: string;

    @Field() @MaxLength(128)
    password: string;
}

@Resolver()
export class AuthResolver {

  @Mutation(() => String)
  async registerUser(
      @Arg('args') { username, password }: RegisterUserInput
  ) {

    const hashedPass = await bcrypt.hash(password, PASSWORD_SALT);
    const [err, sessionId] = await dbRegisterUser(username, hashedPass);
    if (err) throw new ApolloError('something went wrong inserting user', 'INTERNAL_SERVER_ERROR');


    return 'OK';

  }

  // @Mutation()
  // async loginUser() {

  // }

}

