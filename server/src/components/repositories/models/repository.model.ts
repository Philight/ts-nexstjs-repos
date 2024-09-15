import { ObjectType } from '@nestjs/graphql';
import { Field, ID, Float } from '@nestjs/graphql';

import { Owner } from './owner.model';
import { PrimaryLanguage } from './primarylanguage.model';

@ObjectType({ description: 'repository' })
export class Repository {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => ID, { nullable: false })
  externalID: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  descriptionHTML: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  homepageUrl: string;

  @Field()
  openGraphImageUrl: string;

  @Field()
  owner: Owner;

  @Field(() => Float)
  stargazerCount: number;

  @Field({ nullable: true })
  primaryLanguage?: PrimaryLanguage;

  @Field()
  isArchived: boolean;

  @Field()
  isBlankIssuesEnabled: boolean;

  @Field()
  isDisabled: boolean;

  @Field()
  isEmpty: boolean;

  @Field()
  isFork: boolean;

  @Field()
  isInOrganization: boolean;

  @Field()
  isPrivate: boolean;

  @Field()
  isTemplate: boolean;
}
