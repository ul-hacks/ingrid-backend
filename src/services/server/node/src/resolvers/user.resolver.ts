
import { Arg, Query, Resolver } from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { UserProfile } from '../types/user.types';

@Resolver()
export class UserResolver {

  @Query(() => UserProfile)
  async getUserProfile(): Promise<UserProfile> {
    
    let newUserProfile = new UserProfile();
    newUserProfile.username = 'pinosaur';
    newUserProfile.avatar = '';

    return newUserProfile;

  }

}
