import type { FC } from 'react';

import { Skeleton } from '@components/util/Skeleton';

import { Suggest } from '../';

export const SearchSkeleton: FC = () => {
  return (
    <Suggest.Search>
      <Skeleton className='mb-2 h-4 w-[180px]' />
      {Array.from({ length: 3 }, () => (
        <div key={Date.now() * Math.random()} className='mb-2 flex rounded-sm'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className={`ml-2 h-5 w-[100%]`} />
        </div>
      ))}
      <Skeleton className='mb-2 h-4 w-[240px]' />
      {Array.from({ length: 3 }, () => (
        <div key={Date.now() * Math.random()} className='mb-2 flex rounded-sm'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className={`ml-2 h-5 w-[100%]`} />
        </div>
      ))}
    </Suggest.Search>
  );
};
