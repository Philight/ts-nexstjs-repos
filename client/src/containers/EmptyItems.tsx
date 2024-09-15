import { cn } from '@lib/utils';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface EmptyItemsProps extends HTMLAttributes<HTMLDivElement> {}

export const EmptyItems: FC<PropsWithChildren<EmptyItemsProps>> = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        'absolute left-[50%] top-[30%] translate-x-[-50%] text-3xl md:top-[40%] lg:top-[50%]',
        'flex select-none flex-col items-center justify-center text-center md:flex-row',
        className,
      )}
      {...props}
    >
      <p className='mb-4 text-9xl lg:mb-0 lg:text-3xl'>🙅</p>
      {children}
    </section>
  );
};
