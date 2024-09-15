import { cn } from '@lib/utils';
import { motion } from 'framer-motion';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Main: FC<PropsWithChildren<MainContainerProps>> = ({ children, className, ...props }) => {
  return (
    <main className={cn(className, 'f-center-x border md:rounded-tl-lg', 'border-muted py-20 md:pb-12')} {...props}>
      <motion.section
        className={cn('f-col w-full f-center-y')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'just',
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.section>
    </main>
  );
};
