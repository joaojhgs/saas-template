import { createClient } from '@supabase/supabase-js';
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone';

import { env } from '@/env';
import { adminClient } from '@/lib/supabase/server-client';
import { Database } from '@/schemas/supabase';
import { appRouter } from '@/server/routers';

// Mock translations for standalone mode since next-intl depends on Next.js request context
// In a real production setup, you might want to use a different i18n solution or configure next-intl manually
const mockTranslations = (key: string) => key;
const mockInitErrorsAndTranslations = async () => {
  return mockTranslations;
};

const createContext = async ({ req }: CreateHTTPContextOptions) => {
  let supabase = createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
  );

  const authHeader = req.headers['authorization'];
  if (authHeader) {
    supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });
  }

  // We use the mock translations here.
  // If you need real translations in the standalone server, you'd need to adapt initErrorsAndTranslations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (await mockInitErrorsAndTranslations()) as any;

  return {
    supabase,
    supabaseAdmin: adminClient,
    t,
    headers: req.headers as unknown as Headers,
  };
};

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

server.listen(port);
console.log(`tRPC server listening on port ${port}`);
