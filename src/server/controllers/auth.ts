import { z } from 'zod';

import {
  ConfirmAccountInputValidation,
  ForgotPasswordInputValidation,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
  UpdatePasswordInputValidation,
} from '@/schemas/auth';
import { publicProcedure } from '@/server/trpc';

export const loginWithPassword = publicProcedure
  .input(SignInPasswordInputValidation)
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.signInWithPassword(input);

    if (error) throw new Error(error.message);
    return data;
  });

export const registerWithPassword = publicProcedure
  .input(SignUpPasswordInputValidation)
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.signUp(input);

    if (error) throw new Error(error.message);
    return data;
  });

export const logout = publicProcedure.mutation(async ({ ctx }) => {
  const { error } = await ctx.supabase.auth.signOut();

  if (error) throw new Error(error.message);
  return undefined;
});

export const getCurrentUser = publicProcedure.query(async ({ ctx }) => {
  const { error, data } = await ctx.supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data;
});

export const updatePassword = publicProcedure
  .input(UpdatePasswordInputValidation)
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.updateUser(input);

    if (error) throw new Error(error.message);
    return data;
  });

export const forgotPassword = publicProcedure
  .input(ForgotPasswordInputValidation)
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.resetPasswordForEmail(
      input.email,
    );

    if (error) throw new Error(error.message);
    return data;
  });

export const confirmAccount = publicProcedure
  .input(ConfirmAccountInputValidation)
  .mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.verifyOtp(input);

    if (error) throw new Error(error.message);
    return data;
  });

export const validateCodeAndLogin = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const { data, error } =
      await ctx.supabase.auth.exchangeCodeForSession(input);

    if (error) throw new Error(error.message);
    return data;
  });
