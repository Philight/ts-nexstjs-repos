import { Routes } from '@config';
import { cn } from '@lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import Icon from '@components/graphic/Icon';

const Header = memo(() => {
  return (
    <header className={cn('header__c sticky z-20 top-0 page-max-w f-center', ' h-16 bg-base-300')}>
      <Icon icon='github' />
    </header>
  );
});
Header.displayName = 'Header';
export { Header };
