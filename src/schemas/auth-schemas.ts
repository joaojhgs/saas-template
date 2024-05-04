import { z } from 'zod';

export const SignUpPasswordInputValidation = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    params: { i18n: 'passwords-dont-match' },
    path: ['confirmPassword'], // path of error
  });

export const SignInPasswordInputValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
