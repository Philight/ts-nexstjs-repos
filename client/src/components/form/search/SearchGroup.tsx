import type { FC, PropsWithChildren } from 'react';

interface SearchGroupProps {
  heading: string;
}

export const SearchGroup: FC<PropsWithChildren<SearchGroupProps>> = ({ heading, children }) => {
  return (
    <section className='w-full'>
      <p className='ml-2 py-1 text-xs font-bold text-primary'>{heading}</p>
      {children}
    </section>
  );
};
