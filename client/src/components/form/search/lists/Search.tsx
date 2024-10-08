import { Routes } from '@config';
import type { Product } from '@types/product.interface';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { List, Suggest } from '../';
import { SearchGroup } from '../SearchGroup';

interface SearchListProps {
  products: Product[];
  isLoading: boolean;
  onClose: () => void;
}

export const Search: FC<SearchListProps> = ({ products, isLoading, onClose }) => {
  if (isLoading) {
    return <List.SearchSkeleton />;
  }

  if (!products.length) {
    return <Suggest.SearchEmpty />;
  }

  return (
    <Suggest.Search>
      <SearchGroup heading='We found something!'>
        {products.map(product => (
          <Link href={`${Routes.Products}/${product.slug}`} key={product.id} onClick={onClose}>
            <Suggest.SearchItem>
              <SearchIcon className='h-4 w-4 text-foreground' />
              <span className='ml-2'>{product.name}</span>
            </Suggest.SearchItem>
          </Link>
        ))}
      </SearchGroup>
    </Suggest.Search>
  );
};
