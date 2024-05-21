import { SupabaseClient } from '@supabase/supabase-js';
import { getTranslations } from 'next-intl/server';

import { createClient } from '@/lib/supabase/server-client';
import { ReactSerializable } from '@/schemas';
import { Database } from '@/schemas/supabase';
import {
  createServerActionError,
  createServerActionSuccess,
} from '@/utils/result-handling';

import { initErrorsAndTranslations } from './init-errors';

/*
    This a Higher Order Function (HOF) that is used to create a server action.
    It injects the supabase and the translations into the callback function.
    It also deals with error handling and return parsing (stringfy).
    You must provide Type parameters, where T is the type of the values that will be passed to the callback function,
    and R is the return type of the callback function.    
*/

type ICallback<Input, Return> = (callback: {
  supabase: SupabaseClient<Database>;
  t: Awaited<ReturnType<typeof getTranslations<'results'>>>;
  values?: Input;
}) => Promise<Return>;

export default function serverActionHof<
  Input extends ReactSerializable,
  Return extends ReactSerializable = Record<string, unknown>,
>(callback: ICallback<Input, Return>) {
  return async (values?: Input) => {
    try {
      const t = await initErrorsAndTranslations();
      const supabase = createClient();
      return createServerActionSuccess(await callback({ supabase, t, values }));
    } catch (e) {
      if (e instanceof Error) {
        return createServerActionError(e);
      }
    }
  };
}
