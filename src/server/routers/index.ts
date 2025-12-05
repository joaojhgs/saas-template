import { createTRPCRouter } from '@/server/trpc';

import { authRouter } from './auth';
import { uploadRouter } from './upload';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  upload: uploadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
