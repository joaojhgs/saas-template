import { type NextRequest, NextResponse } from 'next/server';

import { type EmailOtpType } from '@supabase/supabase-js';

import { confirmAccount } from '@/server/use-cases/auth';
import { throwIfError } from '@/utils/result-handling';

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;

  if (token_hash && type) {
    /*
        API routes are only server side, as such, there's no need to deal with the stringfy->parsing of response from server actions
        but since the performance impact is negligible and we'll have few API end points, we're keeping the same interface and handling as the client side.
    */
    const data = await throwIfError(confirmAccount({ type, token_hash }));
    if (data.status === 'error') {
      return NextResponse.json(data);
    }
    return NextResponse.redirect(`${requestUrl.origin}/admin`);
  }
  return NextResponse.json({ status: 'error', message: 'Missing params' });
}
