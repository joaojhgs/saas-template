import {
  confirmAccount,
  forgotPassword,
  getCurrentUser,
  loginWithPassword,
  logout,
  registerWithPassword,
  updatePassword,
  validateCodeAndLogin,
} from '@/server/controllers/auth';
import { createTRPCRouter } from '@/server/trpc';

export const authRouter = createTRPCRouter({
  loginWithPassword,
  registerWithPassword,
  logout,
  getCurrentUser,
  updatePassword,
  forgotPassword,
  confirmAccount,
  validateCodeAndLogin,
});
