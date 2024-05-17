'use server';

import { AuthTokenResponsePassword } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server-client';
import {
  ConfirmAccountInputValidation,
  ForgotPasswordInputValidation,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
  UpdatePasswordInputValidation,
} from '@/schemas/auth-schemas';
import {
  IConfirmAccountInput,
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
import serverActionHof from '../server-action';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

// This should either be instantiate every request or only called in request contexts, as of now, leave like this
const supabase = createClient();

export const loginWithPassword = serverActionHof<
  ISignInPasswordInput,
  AuthTokenResponsePassword['data']
>(async (supabase, _, values) => {
  const parsedValues = SignInPasswordInputValidation.parse(values);

  const { data, error } = await supabase.auth.signInWithPassword(parsedValues);
  if (error) throw new Error(error.message);
  return data;
});

export const registerWithPassword = async (values: ISignUpPasswordInput) => {
  try {
    await initErrorsAndTranslations();
    const parsedValues = SignUpPasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.signUp(parsedValues);

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const logout = async () => {
  try {
    await initErrorsAndTranslations();
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return new ServerActionSuccess();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const getCurrentUser = async () => {
  try {
    await initErrorsAndTranslations();

    const { error, data } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const updatePassword = async (values: IUpdatePasswordInput) => {
  try {
    await initErrorsAndTranslations();
    const parsedValue = UpdatePasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.updateUser(parsedValue);

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const forgotPassword = async (values: IForgotPasswordInput) => {
  try {
    await initErrorsAndTranslations();
    const parsedValues = ForgotPasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      parsedValues.email,
    );

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const confirmAccount = async (values: IConfirmAccountInput) => {
  try {
    await initErrorsAndTranslations();
    const parsedValues = ConfirmAccountInputValidation.parse(values);

    const { data, error } = await supabase.auth.verifyOtp(parsedValues);

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};

export const validateCodeAndLogin = async (code: string) => {
  try {
    await initErrorsAndTranslations();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) throw new Error(error.message);

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};
