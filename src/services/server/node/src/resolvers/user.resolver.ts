
import {
  ResolverInterface,
  Root, Arg, Args, Query, Authorized, Field, Ctx,
  Resolver, FieldResolver, Mutation, ArgsType, InputType
} from "type-graphql";
import { ApolloError, UserInputError, ForbiddenError } from 'apollo-server-errors';

import { UserProfile, Extension, Heatmap, Badge, HeatmapItem, ExtensionEnum } from '../types/user.types';
import { getExtension } from '../services/extension.service';
import { dbGetUserByUsername, dbGetUserExtensions, dbSetUserExtensions, dbWipeUserExtensions } from '../services/db.service';
import { SessionContext } from '../types/context.types';

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

    /* find out which extensions the user has */
    const [err, extensionRows] = await dbGetUserExtensions(userProfile.username);
    if (err !== null)
      throw new UserInputError('user does not exist');

    /* fetch heatmap data */
    let userHeatmaps: Heatmap[] = [];

    for (const { provider, account } of extensionRows) {

      /* grab data depending on extension */
      let [err, extensionHeatmap] = await getExtension(provider, account);
      if (err !== null) extensionHeatmap = [];

      /* filter the data (TODO: validate the date strings) */
      // if (from !== null)
      //   extensionHeatmap!.filter(heatmapItem => (new Date(heatmapItem.date)).getTime()-(new Date(from)).getTime());
  
      // if (to !== null)
      //   extensionHeatmap!.filter(heatmapItem => (new Date(to)).getTime()-(new Date(heatmapItem.date)).getTime());

      let newHeatmap = new Heatmap();
      newHeatmap.provider = provider;
      newHeatmap.heatmapItems = extensionHeatmap!;

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
    @Args() { extensionList }: UpdateUserExtensionsInput,
    @Ctx() ctx: SessionContext
  ) {

    if (!ctx.req.session!.userId)
      throw new ForbiddenError('forbidden');
    
    /* wipe all of user's extensions */
    const mappedExtensions: Extension[] = extensionList.map(extension => {
      let newExtension = new Extension();
      newExtension.provider = extension.provider;
      newExtension.account = extension.account;
      return newExtension;
    });
    let [err, ok] = await dbWipeUserExtensions(ctx.req.session!.userId);
    if (err !== null)
      throw new ApolloError('something went wrong wiping old extensions', 'INTERNAL_SERVER_ERROR');

    /* reinsert them all */
    [err, ok] = await dbSetUserExtensions(ctx.req.session!.userId, mappedExtensions);
    if (err !== null)
      throw new ApolloError('something went wrong inserting new extensions', 'INTERNAL_SERVER_ERROR');

    return 'OK';

  }

}
