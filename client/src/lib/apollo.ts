import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Routes } from '@config';
import fetch from 'isomorphic-unfetch';

// ================================================================

const API_GRAPHQL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

const isServer = typeof window === 'undefined';
const isBrowser = typeof window !== 'undefined';
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;
const cache = new InMemoryCache().restore(windowApolloState || {});

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// ================================================================

function createClient() {
  apolloClient = new ApolloClient({
    connectToDevTools: !isServer,
    uri: 'http://localhost:4000/',
    ssrMode: isServer,
    link: new HttpLink({
      uri: API_GRAPHQL,
      fetch: isServer ? fetch : undefined,
      fetchOptions: {
        method: 'POST',
        'Content-Type': 'application/json',
      },
      // headers: {
      //   Authorization: `Bearer ${authToken}`,
      // },
      // credentials: 'include',
    }),
    cache,

    // Default options to disable SSR for all queries.
    defaultOptions: {
      // Skip queries when server side rendering
      // https://www.apollographql.com/docs/react/data/queries/#ssr
      watchQuery: {
        ssr: false,
      },
      query: {
        ssr: false,
      },
      // Selectively enable specific queries like so:
      // `useQuery(QUERY, { ssr: true });`
    },
  });

  return apolloClient;
}

// ================================================================

export default function init({ forceNew = false }: { forceNew?: boolean } = {}) {
  if (!apolloClient || forceNew) {
    return createClient();
  }
  return apolloClient;
}
