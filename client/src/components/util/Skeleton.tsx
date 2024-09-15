import { cn } from '@lib/utils';
import { HTMLAttributes } from 'react';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  // return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
  return <div className={cn('skeleton h-32 w-32', className)} {...props} />;
}

export { Skeleton };
