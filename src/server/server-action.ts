import { SupabaseClient } from '@supabase/supabase-js';
import { getTranslations } from 'next-intl/server';

import { createClient } from '@/lib/supabase/server-client';
import {
  ServerActionError,
  ServerActionSuccess,
} from '@/utils/result-handling';

import { initErrorsAndTranslations } from './init-errors';

/*
    This a Higher Order Function (HOF) that is used to create a server action.
    It injects the supabase and the translations into the callback function.
    It also deals with error handling and return parsing (stringfy).
    You must provide Type parameters, where T is the type of the values that will be passed to the callback function,
    and R is the return type of the callback function.    
*/

export default function serverActionHof<
  Input,
  Return extends Record<string, unknown>,
>(
  callback: (
    supabase: SupabaseClient,
    t: Awaited<ReturnType<typeof getTranslations<'results'>>>,
    values?: Input,
  ) => Promise<Return>,
): (values?: Input) => Promise<Return> | Promise<string> {
  return async (values?: Input) => {
    try {
      const t = await initErrorsAndTranslations();
      const supabase = createClient();
      return new ServerActionSuccess(
        await callback(supabase, t, values),
      ).stringfy();
    } catch (e) {
      return new ServerActionError(e).stringfy();
    }
  };
}
