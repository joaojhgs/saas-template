import { cache } from 'react';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { env } from '@/env';
import { adminClient, createUserClient } from '@/lib/supabase/server-client';
import { Database } from '@/schemas/supabase';
import { initErrorsAndTranslations } from '@/server/init-errors';

type Context = {
  supabase: SupabaseClient<Database>;
  supabaseAdmin: SupabaseClient<Database>;
  t: Awaited<ReturnType<typeof initErrorsAndTranslations>>;
  headers?: Headers;
};

export const createTRPCContext = cache(
  async (opts?: FetchCreateContextFnOptions): Promise<Context> => {
    let supabase = await createUserClient();
    const tTranslations = await initErrorsAndTranslations();

    if (opts?.req) {
      const authHeader = opts.req.headers.get('authorization');
      if (authHeader) {
        supabase = createClient<Database>(
          env.SUPABASE_URL,
          env.SUPABASE_ANON_KEY,
          {
            global: {
              headers: {
                Authorization: authHeader,
              },
            },
          },
        );
      }
    }

    return {
      supabase,
      supabaseAdmin: adminClient,
      t: tTranslations,
      headers: opts?.req?.headers,
    };
  },
);

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const { data, error } = await ctx.supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error('UNAUTHORIZED');
  }

  return next({
    ctx: {
      user: data.user,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
