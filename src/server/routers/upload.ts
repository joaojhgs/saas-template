import { uploadFile } from '@/server/controllers/upload';
import { createTRPCRouter } from '@/server/trpc';

export const uploadRouter = createTRPCRouter({
  uploadFile,
});
