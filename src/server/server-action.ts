import { createClient } from '@/lib/supabase/server-client';
import {
  ReactSerializable,
  ServerActionInjected,
  ServerActionResult,
} from '@/schemas';
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

type ICallback<Input, Output> = (
  injected: ServerActionInjected<Input>,
) => Output;

/**
 * Higher Order Function (HOF) used to create a server action.
 *
 * @template Input - The type of the values that will be passed to the callback function.
 * @template Output - The return type of the callback function.
 *
 * @param {ICallback<Input, Output>} callback - The callback function that will be executed.
 *
 * @returns {Promise<ServerActionResult<Awaited<Output> | undefined>>} - A promise that resolves to the result of the callback.
 */
export default function serverActionHof<
  Input extends ReactSerializable,
  Output extends ReactSerializable,
>(
  callback: ICallback<Input, Output>,
): Input extends undefined
  ? () => Promise<ServerActionResult<Awaited<Output> | undefined>>
  : (
      values: Input,
    ) => Promise<ServerActionResult<Awaited<Output> | undefined>> {
  async function injectionFunction(
    values: Input,
  ): Promise<ServerActionResult<Awaited<Output> | undefined>> {
    try {
      const t = await initErrorsAndTranslations();
      const supabase = createClient();
      return createServerActionSuccess(await callback({ supabase, t, values }));
    } catch (e) {
      if (e instanceof Error) {
        return createServerActionError(e);
      }
    }
    return createServerActionError(new Error('An unknown error occurred'));
  }
  return injectionFunction as Input extends undefined
    ? () => Promise<ServerActionResult<Awaited<Output> | undefined>>
    : (
        values: Input,
      ) => Promise<ServerActionResult<Awaited<Output> | undefined>>;
}
