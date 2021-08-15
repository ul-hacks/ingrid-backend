
import { Field, ObjectType } from 'type-graphql'

export const enum ExtensionEnum {
  GITHUB = 'github',
  GITLAB = 'gitlab'
}

@ObjectType()
export class UserProfile {

  @Field()
  username: string;

  @Field(() => [Extension])
  extensions: Extension[];

  @Field(() => [Heatmap])
  heatmaps: Heatmap[];

  @Field(() => [Badge])
  badges: Badge[];

}

@ObjectType()
export class Extension {
  
  @Field()
  provider: ExtensionEnum;

  @Field()
  account: string;

}

@ObjectType()
export class Heatmap {

  @Field()
  provider: string;

  @Field(() => [HeatmapItem])
  heatmapItems: HeatmapItem[]

}

@ObjectType()
export class HeatmapItem {

  @Field()
  weight: number;

  @Field()
  date: string;

}

@ObjectType()
export class Badge {

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;

  @Field()
  dateAttained: string;

}

