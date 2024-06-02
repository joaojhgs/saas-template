// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { createUserClient } from './lib/supabase/server-client';
import { defaultLocale, languages } from './locale';

const handleI18nRouting = createIntlMiddleware({
  // A list of all locales that are supported
  locales: Object.keys(languages),

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  const supabase = createUserClient();

  if (request.url.includes('admin')) {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) throw new Error('Session not found');
      await supabase.auth.getUser();
    } catch {
      return NextResponse.redirect(
        new URL(`/auth`, request.url).toString() + `?redirect=${request.url}`,
      );
    }
  }

  return response;
}

export const config = {
  // Skip all paths that aren't pages that you'd like to internationalize
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
