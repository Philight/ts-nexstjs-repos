import { QueryResultDto } from '../components/github/dto/query.dto';

import { Repository } from '../components/repositories/models/repository.model';
import { deepMutate } from '../utils/object';

export interface QueryResult {
  search: {
    nodes: unknown[];
    edges: {
      cursor: string;
      node: {
        id: string;
        name: string;
      };
    };
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
  };
}

export const transformGQLQueryResult = (data: QueryResultDto) => {
  const edges = data.search.edges;

  return data.search.nodes.map((item: Repository, i) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // Create externalIDs
    deepMutate(item, 'externalID', item.id);
    deepMutate(item, 'owner.externalID', item.owner.id);
    deepMutate(
      item,
      'primaryLanguage.externalID',
      item.primaryLanguage?.id ?? undefined,
    );

    return {
      ...item,
      cursor: edges[i].cursor,
    };
  });
};
