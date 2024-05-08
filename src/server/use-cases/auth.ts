'use server';

import { createClient } from '@/lib/supabase/server-client';
import {
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
} from '@/schemas/auth-schemas';
import { ISignInPasswordInput, ISignUpPasswordInput } from '@/utils/interfaces';

import { initErrors } from '../init-errors';
import { ServerError, ServerSuccess } from '../result-handling';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

const supabase = createClient();

export const loginWithPassword = async (data: ISignInPasswordInput) => {
  await initErrors();
  let response;
  try {
    SignInPasswordInputValidation.parse(data);
    response = await supabase.auth.signInWithPassword(data);
    if (response.error) throw new Error(response.error.message);
  } catch (e) {
    return new ServerError(e).stringfy();
  }
  return new ServerSuccess(response.data).stringfy();
};

export const registerWithPassword = async (data: ISignUpPasswordInput) => {
  await initErrors();
  let response;
  try {
    SignUpPasswordInputValidation.parse(data);
    response = await supabase.auth.signInWithPassword(data);
    if (response.error) throw new Error(response.error.message);
  } catch (e) {
    return new ServerError(e).stringfy();
  }
  return new ServerSuccess(response.data).stringfy();
};

export const logout = async () => {
  try {
    await initErrors();
    return new ServerSuccess(await supabase.auth.signOut());
  } catch (e) {
    return new ServerError(e).stringfy();
  }
};

export const getCurrentUser = async () => {
  try {
    await initErrors();
    return new ServerSuccess(await supabase.auth.getUser());
  } catch (e) {
    return new ServerError(e).stringfy();
  }
};

export const setPassword = async () => {
  try {
    await initErrors();
    return new ServerSuccess(
      await supabase.auth.updateUser({ password: 'new-password' }),
    ).stringfy();
  } catch (e) {
    return new ServerError(e).stringfy();
  }
};

// export const loginWithGoogle = async () => {
//   return supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: { scopes: 'email' },
//   });
// };
