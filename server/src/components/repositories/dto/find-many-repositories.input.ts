import { Field, Int, Float } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@InputType()
export class FindManyRepositoriesInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => Float, { nullable: true })
  page: number;

  @Field(() => Float, { nullable: true })
  perPage: number;
}
