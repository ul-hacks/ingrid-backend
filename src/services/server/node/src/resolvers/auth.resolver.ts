
import {
  Root, Arg, Query, Authorized,
  Resolver, FieldResolver, Mutation
} from "type-graphql";

@Resolver()
export class AuthResolver {

  @Mutation()
  async registerUser() {

  }

  @Mutation()
  async loginUser() {

  }

}

