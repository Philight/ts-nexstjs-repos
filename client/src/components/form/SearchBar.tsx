import ProductService from '@api/services/product.service';
import { Routes } from '@config';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { type FC, type FormEvent, useRef, useState } from 'react';

import { useComponentVisible } from '@hooks/useComponentVisible';
import { useDebounce } from '@hooks/useDebounce';

import { List, SearchInput } from './search';

export const SearchBar: FC = () => {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible();
  const inputRef = useRef<HTMLInputElement>(null);

  const { debounce } = useDebounce(value, 500);
  const router = useRouter();

  const { data } = useQuery(
    ['get products by term', debounce],
    () => {
      setIsLoading(true);
      return ProductService.getAll({
        page: 1,
        perPage: 6,
        term: debounce,
      });
    },
    {
      enabled: !!debounce,
      onSuccess: () => setTimeout(() => setIsLoading(false), 400),
      select: ({ data }) => data,
    },
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!debounce) return;
    setIsComponentVisible(false);
    inputRef.current?.blur();
    return router.replace(`${Routes.Home}?term=${debounce}`);
  };

  return (
    <form onSubmit={onSubmit} className='relative w-full transition-all md:w-3/4 lg:w-2/5'>
      <div
        ref={ref}
        className={cn('flex h-full w-full flex-col overflow-hidden rounded-md', 'w-full rounded-lg border bg-white text-popover-foreground md:bg-popover')}
      >
        <SearchInput
          ref={inputRef}
          value={value}
          onClear={() => setValue('')}
          onFocus={() => setIsComponentVisible(true)}
          onChange={({ target }) => setValue(target.value)}
        />

        {isComponentVisible && <List.Search products={data?.products || []} isLoading={isLoading} onClose={() => setIsComponentVisible(false)} />}
      </div>
    </form>
  );
};
