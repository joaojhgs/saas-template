'use server';

import {
  IConfirmAccountInput,
  IForgotPasswordInput,
  ISignInPasswordInput,
  ISignUpPasswordInput,
  IUpdatePasswordInput,
  ServerActionInjected,
} from '@/schemas';
import {
  ConfirmAccountInputValidation,
  ForgotPasswordInputValidation,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
  UpdatePasswordInputValidation,
} from '@/schemas/auth-schemas';

import serverActionHof from '../server-action';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

export const loginWithPassword = serverActionHof(
  async ({ supabase, values }: ServerActionInjected<ISignInPasswordInput>) => {
    const parsedValues = SignInPasswordInputValidation.parse(values);

    const { data, error } =
      await supabase.auth.signInWithPassword(parsedValues);

    if (error) throw new Error(error.message);
    return data;
  },
);

export const registerWithPassword = serverActionHof(
  async ({ supabase, values }: ServerActionInjected<ISignUpPasswordInput>) => {
    const parsedValues = SignUpPasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.signUp(parsedValues);

    if (error) throw new Error(error.message);
    return data;
  },
);

export const logout = serverActionHof(async ({ supabase }) => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
  return undefined;
});

export const getCurrentUser = serverActionHof(
  async ({ supabase }: ServerActionInjected) => {
    const { error, data } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data;
  },
);

export const updatePassword = serverActionHof(
  async ({ supabase, values }: ServerActionInjected<IUpdatePasswordInput>) => {
    const parsedValue = UpdatePasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.updateUser(parsedValue);

    if (error) throw new Error(error.message);
    return data;
  },
);

export const forgotPassword = serverActionHof(
  async ({ supabase, values }: ServerActionInjected<IForgotPasswordInput>) => {
    const parsedValues = ForgotPasswordInputValidation.parse(values);

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      parsedValues.email,
    );

    if (error) throw new Error(error.message);
    return data;
  },
);

export const confirmAccount = serverActionHof(
  async ({ supabase, values }: ServerActionInjected<IConfirmAccountInput>) => {
    const parsedValues = ConfirmAccountInputValidation.parse(values);

    const { data, error } = await supabase.auth.verifyOtp(parsedValues);

    if (error) throw new Error(error.message);
    return data;
  },
);

export const validateCodeAndLogin = serverActionHof(
  async ({ supabase, values: code }: ServerActionInjected<string>) => {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) throw new Error(error.message);
    return data;
  },
);
