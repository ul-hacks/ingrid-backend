
import {
  Root, Arg, Query, Authorized,
  Resolver, FieldResolver, Mutation
} from "type-graphql";
import * as bcrypt from 'bcryptjs';

import { PASSWORD_SALT } from '../config';
import { dbRegisterUser } from '../services/db.service';

@Resolver()
export class AuthResolver {

  @Mutation(() => String)
  async registerUser(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {

    const hashedPass = await bcrypt.hash(password, PASSWORD_SALT);
    const sessionId = await dbRegisterUser(username, hashedPass);
    
    return 'OK';

  }

  // @Mutation()
  // async loginUser() {

  // }

}

