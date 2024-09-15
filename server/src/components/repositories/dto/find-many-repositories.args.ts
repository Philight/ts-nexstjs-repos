import { Field, Float, Int } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@ArgsType()
export class FindManyRepositoriesArgs {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  page?: number;

  @Field(() => Float, { nullable: true })
  perPage?: number;
}
