import { cookies } from 'next/headers';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import 'server-only';

import { env } from '@/env';
import { Database } from '@/schemas/supabase';

export function createUserClient() {
  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookies().set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookies().set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

/*
  This is ADMIN client, all requests will ignore RLS. Use with caution.
  Since it does not use cookies nor session, it can be initialized only once and used across all server functions
*/

export const adminClient = createServerClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    cookies: {},
  },
);
