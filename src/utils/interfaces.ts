import { z } from 'zod';

import {
  SignInPasswordInputValidation,
  SignUpPasswordInputValidation,
} from '@/schemas/auth-schemas';

/*
 * This file contains all the interfaces and validations that are used in the application.
 * Shared between client and server side.
 */

export type ISignInPasswordInput = z.infer<
  typeof SignInPasswordInputValidation
>;

export type ISignUpPasswordInput = z.infer<
  typeof SignUpPasswordInputValidation
>;
