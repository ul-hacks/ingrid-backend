
import {
  ResolverInterface,
  Root, Arg, Query,
  Resolver, FieldResolver, Mutation
} from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { UserProfile, Extension, Heatmap } from '../types/user.types';

@Resolver(of => UserProfile)
export class UserProfileResolver implements ResolverInterface<UserProfile> {

  @Query(() => UserProfile)
  async getUserProfile(
    @Arg('username') username: string
  ): Promise<UserProfile> {
    
    let newUserProfile = new UserProfile();
    newUserProfile.username = username;
    newUserProfile.avatar = '';
    newUserProfile.extensions = [];

    return newUserProfile;

  }

  @FieldResolver()
  async extensions(
    @Root() userProfile: UserProfile
  ): Promise<Extension[]> {
    return [];
  }

  @FieldResolver()
  async heatmaps(
    @Root() userProfile: UserProfile,
    @Arg('from', { nullable: true }) from: string,
    @Arg('to', { nullable: true }) to: string
  ): Promise<Heatmap[]> {
    return [];
  }

}
