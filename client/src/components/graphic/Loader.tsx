import { Loader as LoaderIcon } from 'lucide-react';
import type { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className='flex h-screen-64 w-full items-center justify-center'>
      <LoaderIcon className='h-[128px] w-[128px] animate-spin' />
    </div>
  );
};
