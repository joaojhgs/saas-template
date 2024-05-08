'use server';

import { createClient } from '@/lib/supabase/server-client';
import {
  ForgotPasswordInputValidation,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
  UpdatePasswordInputValidation,
} from '@/schemas/auth-schemas';
import {
  IForgotPasswordInput,
  ISignInPasswordInput,
  ISignUpPasswordInput,
  IUpdatePasswordInput,
} from '@/utils/interfaces';

import {
  ServerActionError,
  ServerActionSuccess,
} from '../../utils/result-handling';
import { initErrorsAndTranslations } from '../init-errors';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

const supabase = createClient();

export const loginWithPassword = async (data: ISignInPasswordInput) => {
  await initErrorsAndTranslations();
  let response;
  try {
    SignInPasswordInputValidation.parse(data);
    response = await supabase.auth.signInWithPassword(data);
    if (response.error) throw new Error(response.error.message);
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
  return new ServerActionSuccess(response.data).stringfy();
};

export const registerWithPassword = async (data: ISignUpPasswordInput) => {
  await initErrorsAndTranslations();
  let response;
  try {
    SignUpPasswordInputValidation.parse(data);
    response = await supabase.auth.signInWithPassword(data);
    if (response.error) throw new Error(response.error.message);
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
  return new ServerActionSuccess(response.data).stringfy();
};

export const logout = async () => {
  try {
    await initErrorsAndTranslations();
    return new ServerActionSuccess(await supabase.auth.signOut());
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const getCurrentUser = async () => {
  let response;
  try {
    await initErrorsAndTranslations();
    response = await supabase.auth.getUser();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
  return new ServerActionSuccess(response).stringfy();
};

export const updatePassword = async (data: IUpdatePasswordInput) => {
  try {
    await initErrorsAndTranslations();
    UpdatePasswordInputValidation.parse(data);
    return new ServerActionSuccess(
      await supabase.auth.updateUser(data),
    ).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const forgotPassword = async (data: IForgotPasswordInput) => {
  try {
    await initErrorsAndTranslations();
    ForgotPasswordInputValidation.parse(data);
    return new ServerActionSuccess(
      await supabase.auth.resetPasswordForEmail(data.email),
    ).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

// export const loginWithGoogle = async () => {
//   return supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: { scopes: 'email' },
//   });
// };
