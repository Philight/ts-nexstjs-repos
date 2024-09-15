import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';
import { Repository } from '../models/repository.model';
// @InputType()
// export class CategoryCreateInput {
//   @Field(() => String, { nullable: false })
//   name!: string;

//   @Field(() => Date, { nullable: true })
//   createdAt?: Date | string;

//   @Field(() => Date, { nullable: true })
//   updatedAt?: Date | string;

//   @Field(() => ArticleCreateNestedManyWithoutCategoryInput, { nullable: true })
//   articles?: ArticleCreateNestedManyWithoutCategoryInput;
// }

@ArgsType()
export class CreateOneRepositoryArgs {
  @Field(() => Repository, { nullable: false })
  // @Type(() => Repository)
  data!: Repository;
}
