import { gql, useQuery } from '@apollo/client';
import { Routes } from '@config';
import { cn } from '@lib/utils';
import { QUERY_REPOSITORIES, REPOSITORY_FIELDS } from '@queries/repositories';
import { useState } from 'react';

import { SearchBar } from '@components/form/SearchBar';
import { SearchForm } from '@components/form/SearchForm';
import { DataColumns, Repository } from '@components/list/DataColumns';
import { DataTable } from '@components/list/DataTable';

import { Main } from '@containers/Main';
import { Meta } from '@containers/Meta';

// ================================================================

const ITEM_COUNT = 10;
const MAX_PAGES = 20;

const query = gql`
  ${QUERY_REPOSITORIES}
`;

// ================================================================

export default function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearch] = useState<string>('');
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { name: searchQuery, page, perPage: 10 },
  });

  console.log('query state loading|error', loading, error);
  console.log('query data', data);

  const changePage = (mode: string) => {
    // setCursor(cursor);
    setPage(prevPage => {
      if (mode === 'prev' && prevPage > 1) return prevPage - 1;
      if (mode === 'next' && prevPage < MAX_PAGES) return prevPage + 1;
      return prevPage;
    });
  };

  if (error) return `Error! ${error}`;

  // ================================================================

  const pagination = {
    hasPreviousPage: page > 1,
    hasNextPage: page <= MAX_PAGES,
  };
  console.log('pagination', page, pagination);

  return (
    <Meta title='Github Repositories'>
      <Main className='min-h-screen-64 page-max-w'>
        <h1 className={cn('mb-12')}>GitHub Repos</h1>
        <SearchForm className='' onSearch={setSearch} />
        {!!searchQuery && <DataTable columns={DataColumns} loading={loading} data={data?.getRepositories ?? []} pagination={pagination} onPage={changePage} />}
      </Main>
    </Meta>
  );
}
