import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { Repository as PrismaRepository } from '@prisma/client';
// import { CreateOneRepositoryArgs } from './dto/create-one-repository.args';
// import { UpdateOneRepositoryArgs } from './dto/update-one-repository.args';
import { FindManyRepositoriesArgs } from './dto/find-many-repositories.args';
import { Repository } from './models/repository.model';
import { RepositoriesService } from './repositories.service';

// import { PubSub } from 'graphql-subscriptions';
// const pubSub = new PubSub();

// import {
//   ApiBody,
//   ApiOperation,
//   ApiParam,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { user } from '@src/config/docs';

// ========================================================================

// @Resolver((of) => Repository)
@Resolver(() => Repository)
export class RepositoriesResolver {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  // ========================================================================

  @Query(() => Repository)
  // @Query('getRepository')
  async getRepository(@Args('id') id: string): Promise<PrismaRepository> {
    const repository = await this.repositoriesService.findOne(id);
    if (!repository) {
      throw new NotFoundException(id);
    }
    return repository;
  }

  @Query(() => [Repository])
  getRepositories(
    @Args() args: FindManyRepositoriesArgs,
    @Args('name', { nullable: true }) name: string,
    @Args('page', { nullable: true }) page: number,
    @Args('perPage', { nullable: true }) perPage: number,
  ): Promise<PrismaRepository[]> {
    console.log('Repository RESOLVER args', args);
    console.log('Repository RESOLVER ...args | ', name, page, perPage);

    if (!name) return [] as any;

    // return this.repositoriesService.findMany(args);
    return this.repositoriesService.findMany({
      name,
      page,
      perPage,
    });
  }

  // ========================================================================

  // // @Mutation('createRepository')
  // @Mutation(() => Repository)
  // createRepository(
  //   // @Args('createOneRepositoryArgs')
  //   @Args()
  //   createOneRepositoryArgs: CreateOneRepositoryArgs,
  // ): Promise<PrismaRepository> {
  //   return this.repositoriesService.create(createOneRepositoryArgs);
  // }

  // // @Mutation('updateRepository')
  // @Mutation(() => Repository)
  // updateRepository(
  //   // @Args('updateOneRepositoryArgs')
  //   @Args()
  //   updateOneRepositoryArgs: UpdateOneRepositoryArgs,
  // ): Promise<PrismaRepository> {
  //   return this.repositoriesService.update(
  //     updateOneRepositoryArgs.data.id,
  //     updateOneRepositoryArgs.data,
  //   );
  // }

  @Mutation(() => Repository, { nullable: true })
  // @Mutation('removeRepository')
  removeRepository(@Args('id') id: string) {
    return this.repositoriesService.remove(id);
  }

  // ========================================================================

  // @Subscription((returns) => Repository)
  // repoAdded() {
  //   return pubSub.asyncIterator('repoAdded');
  // }

  // ========================================================================
}
