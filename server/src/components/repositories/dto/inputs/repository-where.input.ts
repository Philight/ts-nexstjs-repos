import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class RepositoryWhereInput {
  @Field(() => [RepositoryWhereInput], { nullable: true })
  AND?: Array<RepositoryWhereInput>;

  @Field(() => [RepositoryWhereInput], { nullable: true })
  OR?: Array<RepositoryWhereInput>;

  @Field(() => [RepositoryWhereInput], { nullable: true })
  NOT?: Array<RepositoryWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;
}
