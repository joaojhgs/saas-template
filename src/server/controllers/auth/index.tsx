'server-only';

import { type NextRequest, NextResponse } from 'next/server';

import { type EmailOtpType } from '@supabase/supabase-js';

import { confirmAccount, validateCodeAndLogin } from '@/server/use-cases/auth';
import { throwIfError } from '@/utils/result-handling';

export async function confirmAccountController(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;

  if (token_hash && type) {
    const data = await throwIfError(confirmAccount({ type, token_hash }));
    if (data.status === 'error') {
      return NextResponse.json(data);
    }
    return NextResponse.redirect(`${requestUrl.origin}/admin`);
  }
  return NextResponse.json({ status: 'error', message: 'Missing params' });
}

export async function resetPasswordController(request: NextRequest) {
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
