import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { type AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Header } from '@components/layout';

import { persistor, store } from '@redux/store';

import '@styles/globals.css';

import getApolloClient from '../lib/apollo';

import { Toaster } from '@/components/action/Sonner';

// ================================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// ================================================================

export default function App({ Component, pageProps, router }: AppProps) {
  const apolloClient = getApolloClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster closeButton />
            <Header />
            <AnimatePresence mode='wait' initial={false}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
