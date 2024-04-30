'use server';

import { createClient } from '@/lib/supabase/server-client';
import {
  ISignInPasswordInput,
  ISignUpPasswordInput,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
} from '@/utils/interfaces';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

const supabase = createClient();

export const loginWithPassword = async (data: ISignInPasswordInput) => {
  SignInPasswordInputValidation.parse(data);
  return supabase.auth.signInWithPassword(data);
};

export const registerWithPassword = async (data: ISignUpPasswordInput) => {
  SignUpPasswordInputValidation.parse(data);
  supabase.auth.signUp(data);
};

export const logout = async () => {
  return supabase.auth.signOut();
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// export const loginWithGoogle = async () => {
//   return supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: { scopes: 'email' },
//   });
// };
