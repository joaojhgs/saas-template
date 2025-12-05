import { cache } from 'react';

// Supports a separate server deployment for TRPC if the URL is set
import { headers } from 'next/headers';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import 'server-only';
import superjson from 'superjson';

import { env } from '@/env';
import { type AppRouter, appRouter } from '@/server/routers';
import { createTRPCContext } from '@/server/trpc';
import { getTRPCUrl } from '@/utils/helpers';

import { makeQueryClient } from './query-client';

export const getQueryClient = cache(makeQueryClient);

export const trpc = env.NEXT_PUBLIC_SERVER_URL
  ? createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getTRPCUrl(),
          async headers() {
            const heads = new Map(await headers());
            heads.set('x-trpc-source', 'rsc');
            return Object.fromEntries(heads);
          },
        }),
      ],
    })
  : createTRPCOptionsProxy({
      ctx: createTRPCContext,
      router: appRouter,
      queryClient: getQueryClient,
    });
