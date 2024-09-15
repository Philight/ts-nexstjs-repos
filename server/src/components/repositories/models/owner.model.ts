import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'repo owner' })
export class Owner {
  @Field(() => ID)
  id: string;

  @Field()
  login: string;

  @Field()
  url: string;

  @Field()
  avatarUrl: string;
}
