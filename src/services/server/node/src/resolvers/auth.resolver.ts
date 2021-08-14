
import {
  InputType, Resolver, Mutation,
  Field, Arg, Ctx
} from 'type-graphql';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';

import { MaxLength } from 'class-validator';
import { IsUsernameNotRegistered } from '../middleware/validation';

import { PASSWORD_SALT } from '../config';
import { SessionContext } from '../types/context.types'
import { dbRegisterUser, dbGetUserByUsername } from '../services/db.service';

@InputType()
export class RegisterUserInput {

    @Field() @MaxLength(64)
    @IsUsernameNotRegistered({ message: 'username already used' })
    username: string;

    @Field() @MaxLength(128)
    password: string;
}

@InputType()
export class LoginUserInput {
    
  @Field()
  username: string;

  @Field()
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

  @Mutation(() => String)
  async loginUser(
    @Arg('args') { username, password }: LoginUserInput,
    @Ctx() ctx: SessionContext
  ) {

    const [err, userRow] = await dbGetUserByUsername(username);
    if (userRow.length == 0)
      throw new AuthenticationError('username or password incorrect');

    const validated = await bcrypt.compare(password, userRow[0].password);
    if (!validated)
      throw new AuthenticationError('username or password incorrect');

    ctx.req.session!.userId = userRow[0].id;

    return 'OK';
  }

}

