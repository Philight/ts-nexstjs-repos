import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

import { RepositoryWhereInput } from './repository-where.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class RepositoryWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [RepositoryWhereInput], { nullable: true })
  AND?: Array<RepositoryWhereInput>;

  @Field(() => [RepositoryWhereInput], { nullable: true })
  OR?: Array<RepositoryWhereInput>;

  @Field(() => [RepositoryWhereInput], { nullable: true })
  NOT?: Array<RepositoryWhereInput>;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;
}
