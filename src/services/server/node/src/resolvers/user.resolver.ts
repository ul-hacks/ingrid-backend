
import {
  ResolverInterface,
  Root, Arg, Query, Authorized,
  Resolver, FieldResolver, Mutation
} from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { UserProfile, Extension, Heatmap, HeatmapItem } from '../types/user.types';
import { ExtensionEnum, getExtension } from '../services/extension.service';

@Resolver(of => UserProfile)
export class UserProfileResolver implements ResolverInterface<UserProfile> {

  @Query(() => UserProfile)
  async getUserProfile(
    @Arg('username') username: string
  ): Promise<UserProfile> {
    
    let newUserProfile = new UserProfile();
    newUserProfile.username = username;
    newUserProfile.email = 'lmao@lamo.com';
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

    /* find out which extensions the user has */
    const extensionMap: Map<ExtensionEnum, string> = new Map([
      [ExtensionEnum.GITHUB, 'pinosaur'],
      [ExtensionEnum.GITLAB, 'pinosaur'],
    ]); // hardcoded for now

    /* fetch heatmap data */
    let userHeatmaps: Heatmap[] = [];
    for (const [ provider, account ] of extensionMap) {

      /* grab data depending on extension */
      let extensionHeatmap = getExtension(provider, account);


      /* filter the data */
      if (from !== null) { }
      if (to !== null) { }

      let newHeatmap = new Heatmap();
      newHeatmap.provider = provider;
      newHeatmap.heatmapItems = [];

      userHeatmaps.push(newHeatmap);
    }

    return userHeatmaps; 
  }

  // hook this up with auth later
  @Mutation(() => UserProfile)
  async updateUserExtensions() {

  }

}
