import { z } from 'zod';

import {
  ConfirmAccountInputValidation,
  ForgotPasswordInputValidation,
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
  UpdatePasswordInputValidation,
} from '@/schemas/auth-schemas';

export type ISignInPasswordInput = z.infer<
  typeof SignInPasswordInputValidation
>;

export type ISignUpPasswordInput = z.infer<
  typeof SignUpPasswordInputValidation
>;

export type IForgotPasswordInput = z.infer<
  typeof ForgotPasswordInputValidation
>;

export type IUpdatePasswordInput = z.infer<
  typeof UpdatePasswordInputValidation
>;

export type IConfirmAccountInput = z.infer<
  typeof ConfirmAccountInputValidation
>;
