import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';
import { Repository } from '../models/repository.model';
import { Prisma } from '@prisma/client';
import { RepositoryWhereUniqueInput } from './inputs/repository-where-unique.input';

@ArgsType()
export class UpdateOneRepositoryArgs {
  @Field(() => Repository, { nullable: false })
  // @Type(() => Repository)
  data!: Repository;

  @Field(() => RepositoryWhereUniqueInput, { nullable: false })
  // @Type(() => RepositoryWhereUniqueInput)
  where!: Prisma.AtLeast<RepositoryWhereUniqueInput, 'id' | 'name'>;
}
