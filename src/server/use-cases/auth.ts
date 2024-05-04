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
  await initErrors();
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  await initErrors();
  return supabase.auth.getUser();
};

export const setPasswrod = async () => {
  await initErrors();
  return supabase.auth.updateUser({ password: 'new-password' });
};

// export const loginWithGoogle = async () => {
//   return supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: { scopes: 'email' },
//   });
// };
