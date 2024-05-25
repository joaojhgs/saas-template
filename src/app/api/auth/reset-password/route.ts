import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { validateCodeAndLogin } from '@/server/use-cases/auth';
import { throwIfError } from '@/utils/result-handling';

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const data = await throwIfError(validateCodeAndLogin(code));

    if (data.status === 'error') {
      return NextResponse.json(data);
    }
  }
  // The user is now logged in so he can directly access the admin page and update it's password
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/admin/update_password`);
}
