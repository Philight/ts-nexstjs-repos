import { Injectable } from '@nestjs/common';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient, gql } from 'graphql-request';

import { transformGQLQueryResult } from '../../utils/graphql';
import { QueryDto, QueryResultDto } from './dto/query.dto';
import { QUERY_REPOSITORIES } from './queries/repositories';

// ========================================================================

@Injectable()
// export class GithubService extends GraphQLClient {
export class GithubService {
  constructor(
    @InjectGraphQLClient() private readonly gqlClient: GraphQLClient,
  ) {}

  // ========================================================================

  async test() {
    return 'GithubService Github Github message';
  }

  async queryRepositories(args: QueryDto) {
    const {
      searchTerm,
      perPage: count = 10,
      sort,
      startingFromCursor: fromCursor = '',
    } = args;
    console.log('-------- GITHUB queryRepositories fromCursor', fromCursor);

    const params = {
      query: [searchTerm, sort].join(' ').trim(),
      fromCursor,
      count,
    };

    const query = gql`
      ${QUERY_REPOSITORIES}
    `;

    const response: QueryResultDto = await this.gqlClient.request(
      query,
      params,
    );

    try {
      require('node:fs').writeFileSync(
        './logs/github_query.json',
        JSON.stringify(response),
      );
    } catch (e) {
      console.error(e);
    }

    const transformed = transformGQLQueryResult(response);
    // console.info('GithubService =>  transformed', transformed);

    return transformed;
  }
}
