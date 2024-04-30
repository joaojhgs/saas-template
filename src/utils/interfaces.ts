import { z } from 'zod';

/*
 * This file contains all the interfaces and validations that are used in the application.
 * Shared between client and server side.
 */

export const SignInPasswordInputValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ISignInPasswordInput = z.infer<
  typeof SignInPasswordInputValidation
>;

export const SignUpPasswordInputValidation = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });
export type ISignUpPasswordInput = z.infer<
  typeof SignUpPasswordInputValidation
>;
