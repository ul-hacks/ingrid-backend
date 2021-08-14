
import {
  ResolverInterface,
  Root, Arg, Args, Query, Authorized, Field,
  Resolver, FieldResolver, Mutation, ArgsType, InputType
} from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { UserProfile, Extension, Heatmap, Badge, HeatmapItem, ExtensionEnum } from '../types/user.types';
import { getExtension } from '../services/extension.service';
import { dbGetUserByUsername, dbGetUserExtensions } from '../services/db.service';

@InputType()
export class ExtensionListInput {
  
  @Field()
  provider: ExtensionEnum;

  @Field()
  account: string;

}

@ArgsType()
export class UpdateUserExtensionsInput {

  @Field(() => [ExtensionListInput])
  extensionList: ExtensionListInput[];

}

@Resolver(of => UserProfile)
export class UserProfileResolver implements ResolverInterface<UserProfile> {

  @Query(() => UserProfile)
  async getUserProfile(
    @Arg('username') username: string
  ): Promise<UserProfile> {
    
    /* fetch from db */
    const [err, userRow] = await dbGetUserByUsername(username);
    if (err !== null || userRow.length === 0)
      throw new UserInputError('user does not exist');

    let newUserProfile = new UserProfile();
    newUserProfile.username = userRow[0].username;

    return newUserProfile;

  }

  @FieldResolver()
  async extensions(
    @Root() userProfile: UserProfile
  ): Promise<Extension[]> {

    /* do db query */

    return [];
  }

  @FieldResolver()
  async heatmaps(
    @Root() userProfile: UserProfile,
    @Arg('from', { nullable: true }) from: string,
    @Arg('to', { nullable: true }) to: string
  ): Promise<Heatmap[]> {

    // const [err, extensionRows] = await dbGetUserExtensions(userProfile.username);
    // console.log(extensionRows);

    /* find out which extensions the user has */
    const extensionMap: Map<ExtensionEnum, string> = new Map([
      [ExtensionEnum.GITHUB, 'pinosaur'],
      [ExtensionEnum.GITLAB, 'pinosaur'],
    ]); // hardcoded for now

    /* fetch heatmap data */
    let userHeatmaps: Heatmap[] = [];
    for (const [ provider, account ] of extensionMap) {

      /* grab data depending on extension */
      let extensionHeatmap: HeatmapItem[] = await getExtension(provider, account);

      /* filter the data (TODO: validate the date strings) */
      if (from !== null)
        extensionHeatmap.filter(heatmapItem => (new Date(heatmapItem.date)).getTime()-(new Date(from)).getTime());
  
      if (to !== null)
        extensionHeatmap.filter(heatmapItem => (new Date(to)).getTime()-(new Date(heatmapItem.date)).getTime());

      let newHeatmap = new Heatmap();
      newHeatmap.provider = provider;
      newHeatmap.heatmapItems = extensionHeatmap;

      userHeatmaps.push(newHeatmap);
    }

    return userHeatmaps; 
  }

  @FieldResolver()
  async badges(
    @Root() userProfile: UserProfile
  ): Promise<Badge[]> {

    return [];
  }

  @Mutation(() => String)
  async updateUserExtensions(
    @Args() extensionList : UpdateUserExtensionsInput
  ) {
    
    /* wipe all of user's extensions */

    /* reinsert them all */

    return '';

  }

}
