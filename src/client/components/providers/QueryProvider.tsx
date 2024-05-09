'use client';

import React, { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type QueryProviderProps = {
  children: ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * (60 * 1000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 3,
            // Retries at 4, 16 and 64 seconds
            retryDelay: (attemptIndex) => 1000 * 4 ** (attemptIndex + 1),
          },
        },
      }),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default QueryProvider;
