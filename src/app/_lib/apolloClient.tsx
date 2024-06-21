// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<any> | undefined;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL, // GraphQL server URL
});

const authLink = setContext((_, { headers }) => {
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // Authorization: token ? `Bearer ${token}` : "",
    }
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function ApolloProviderComponent({ children, initialState }: any) {
  const client = useMemo(() => initializeApollo(initialState), [initialState]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
