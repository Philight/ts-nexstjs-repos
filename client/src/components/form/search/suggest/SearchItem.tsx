import { cn } from '@lib/utils';
import { FC, PropsWithChildren } from 'react';

export const SearchItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
        'text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground',
        'transition-all hover:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      )}
    >
      {children}
    </div>
  );
};
