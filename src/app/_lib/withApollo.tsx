// lib/withApollo.js

import { ApolloProviderComponent, initializeApollo } from './apolloClient';

export const withApollo = (PageComponent: any) => {
  const WithApollo = ({ initialApolloState, ...pageProps }: any) => {

    const client = initializeApollo(initialApolloState);
    
    return (
      <ApolloProviderComponent initialState={initialApolloState}>
        <PageComponent {...pageProps} />
      </ApolloProviderComponent>
    );
  };

  WithApollo.getInitialProps = async (ctx: any) => {
    const { AppTree } = ctx;
    const apolloClient = initializeApollo();

    ctx.apolloClient = apolloClient;

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if (typeof window === 'undefined') {
      const { getDataFromTree } = await import('@apollo/client/react/ssr');
      try {
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error);
      }
    }

    const initialApolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      initialApolloState
    };
  };

  return WithApollo;
};
