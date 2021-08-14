
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserProfile {

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field(() => [Extension])
  extensions: Extension[];

  @Field(() => [Heatmap])
  heatmaps: Heatmap[];

}

@ObjectType()
export class Extension {
  
  @Field()
  provider: string;

  @Field()
  account: string;

}

@ObjectType()
export class Heatmap {

  @Field()
  provider: string;

  @Field()
  weight: number;

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

