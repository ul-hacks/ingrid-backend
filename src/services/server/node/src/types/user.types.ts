
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserProfile {

  @Field()
  username: string;

  @Field()
  avatar: string;

}
