import crypto from 'crypto';
import { z } from 'zod';

import { protectedProcedure } from '@/server/trpc';

export const uploadFile = protectedProcedure
  .input(
    z.object({
      bucketName: z.string(),
      fileBase64: z.string(),
      fileName: z.string().optional(),
      contentType: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const uuid = crypto.randomUUID();
    const fileName = input.fileName || uuid;
    const buffer = Buffer.from(input.fileBase64, 'base64');

    const { data, error } = await ctx.supabase.auth.getUser();
    if (!data.user) throw new Error('User not found');
    if (error) throw new Error(error.message);

    // Upload to Supabase Storage
    // Note: We use the standard upload method.
    // Since we are on the server, we can use the buffer directly.
    const { data: uploadData, error: uploadError } = await ctx.supabase.storage
      .from(input.bucketName)
      .upload('public/' + fileName, buffer, {
        upsert: true,
        contentType: input.contentType,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    return uploadData;
  });
