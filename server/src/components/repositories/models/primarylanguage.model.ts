import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Primary language' })
export class PrimaryLanguage {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  color: string;
}
