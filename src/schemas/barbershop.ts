import { z } from 'zod';

export const UpdateBarbershopInputValidation = z.object({
  id: z.string(),
  name: z
    .string()
    .min(8, { message: 'Name must be at least 8 characters long' })
    .max(80, { message: 'Name must be at most 80 characters long' })
    .optional(),
  description: z
    .string()
    .min(8, { message: 'Description must be at least 8 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long' })
    .optional(),
});
