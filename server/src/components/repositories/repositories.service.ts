// @ts-nocheck
import { Logger, Injectable } from '@nestjs/common';
// import type { Prisma } from '@prisma/client';

import { Repository } from './models/repository.model';
import { CreateOneRepositoryArgs } from './dto/create-one-repository.args';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { GithubService } from '../github/github.service';

import { partition, removePropertyFromArray } from '../../utils/array';

// ========================================================================

const REPOSITORY = 'repository'; // @mapped to 'repositories' Collection

// ========================================================================

@Injectable()
export class RepositoriesService {
  private logger = new Logger(RepositoriesService.name); // LOGGER INITIALIZING WITH CONTEXT

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly githubService: GithubService,
    private readonly paginationService: PaginationService,
  ) {
    // const NODE_ENV = this.configService.get<string>('NODE_ENV');
  }

  async findOne(id: string) {
    return this.prisma[REPOSITORY].findFirst({ where: { id } });
  }

  async findMany({ name, page, perPage }: any) {
    const { skip, take } = this.paginationService.getPagination({
      page,
      perPage,
    });

    /**
     * Read from DB
     */

    const dbResult = await this.prisma[REPOSITORY].findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        owner: true,
        primaryLanguage: true,
      },
      skip,
      take,
      orderBy: { stargazerCount: 'desc' },
    });

    this.logger.log(`[ prisma ] Found records: ${dbResult.length}`);

    /**
     * If found enough records, return records
     */

    if (dbResult.length >= take) return dbResult;

    /**
     * If found less results than perPage, query github API
     */

    if (dbResult.length < take) {
      this.logger.log(`Not enough records, querying Github..`);

      // query github gql
      const sort = 'sort:interactions-desc sort:reactions-+1'; //sortByPopularityDesc

      // get last record's cursor
      // const startingFromCursor =
      // dbResult.length > 0 ? dbResult.slice(-1)[0].cursor : '';
      const startingFromCursor =
        (dbResult.length > 0
          ? dbResult.slice(-1)[0].cursor
          : (
              await this.prisma['search'].findFirst({
                where: {
                  keyword: name,
                },
                take: -1,
                orderBy: { createdAt: 'desc' },
              })
            )?.cursor) ?? '';

      /**
       * Query GH GQL
       */
      const queriedRepositories = await this.githubService.queryRepositories({
        searchTerm: name,
        // Take 3x more results as reserve
        perPage: take * 3,
        sort,
        startingFromCursor,
      });

      /**
       * Save query
       */
      const queryRan = await this.prisma['search'].create({
        data: {
          keyword: name,
          cursor: queriedRepositories.slice(-1)[0].cursor,
          recordCount: queriedRepositories.length,
        },
      });
      this.logger.log(
        `[ github ] Query results: [keyword] ${queryRan.keyword} [recordCount] ${queryRan.recordCount} [cursor] ${queryRan.cursor}`,
      );

      /**
       * Upsert repositories
       */
      this.logger.log(`Upserting records..`);

      this.upsertMany(queriedRepositories);

      // Append records and return
      const diffCount = take - dbResult.length;
      const result = dbResult.concat(queriedRepositories.slice(0, diffCount));

      this.logger.log(
        `Merging records[${result.length}] and sending to client ------`,
      );
      // this.logger.verbose(`${JSON.stringify(result, null, 2)}`);

      return result;
    }
  }

  async create(args: CreateOneRepositoryArgs) {
    return this.prisma[REPOSITORY].create(args);
  }

  async update(id: string, data: Repository) {
    return this.prisma[REPOSITORY].update({
      data,
      where: {
        id,
      },
    });
  }

  async upsert(args: CreateOneRepositoryArgs) {
    return this.prisma[REPOSITORY].create(args);
  }

  async upsertMany(repositories: Repository[]) {
    try {
      const upsertIds = repositories.map((repo) => repo.externalID);
      const updateIds = (
        await this.prisma[REPOSITORY].findMany({
          where: {
            externalID: { in: upsertIds },
          },
          select: {
            externalID: true,
          },
        })
      ).map((instance) => instance.externalID);

      /**
       * Split update and create
       */

      const [reposToUpdate, reposToCreate] = partition(repositories, (repo) =>
        updateIds.includes(repo.externalID),
      );

      this.logger.debug(`upsertMany -> reposToCreate: ${reposToCreate.length}`);
      // this.logger.verbose(`upsertMany -> reposToCreate |
      //   ${JSON.stringify(reposToCreate, null, 2)}`);

      this.logger.debug(`upsertMany -> reposToUpdate: ${reposToUpdate.length}`);
      // this.logger.verbose(`upsertMany -> reposToUpdate |
      //   ${JSON.stringify(reposToUpdate, null, 2)}`);

      /**
       * Bulk create, remove ids
       */

      if (reposToCreate.length) {
        // const createRepos = removePropertyFromArray(reposToCreate, 'id');
        // this.prisma[REPOSITORY].createMany({
        //   data: createRepos,
        // }).then((bulkCreate) =>
        //   console.log('Repository.SERVICE upsertMany bulkCreate | ', bulkCreate),
        // );

        const nestedWriteSequence = await reposToCreate.map(async (repo) => {
          const { owner, primaryLanguage, ...repositoryData } = repo;

          // remove Ids
          delete owner.id;
          delete primaryLanguage?.id;
          delete repositoryData.id;

          return await this.prisma[REPOSITORY].create({
            data: {
              ...repositoryData,
              owner: {
                connectOrCreate: {
                  create: { ...owner },
                  where: { login: owner.login },
                },
              },
              primaryLanguage: primaryLanguage
                ? {
                    connectOrCreate: {
                      create: { ...primaryLanguage },
                      where: { name: primaryLanguage.name },
                    },
                  }
                : undefined,
            },
          });
        });

        this.logger.log(
          `upsertMany -> nestedWriteSequence | Records created: ${nestedWriteSequence.length}`,
        );
      }

      /**
       * Bulk update, remove ids
       */

      if (reposToUpdate.length) {
        const updateRepos = removePropertyFromArray(reposToUpdate, 'id');
        this.prisma
          .$transaction(async (txPrisma) =>
            updateRepos.map((data) =>
              txPrisma[REPOSITORY].update({
                where: { externalID: data.externalID },
                data,
              }),
            ),
          )
          .then((bulkUpdate) =>
            this.logger.log(
              `upsertMany -> bulkUpdate | Records updated: ${bulkUpdate.length}`,
            ),
          );
      }
    } catch (e) {
      this.logger.error(`upsertMany -> Error: ${e?.message}`);
      this.logger.debug(JSON.stringify(e, null, 2));
    }
  }

  async remove(id: string) {
    this.prisma[REPOSITORY].delete({ where: { id } });
  }
}
