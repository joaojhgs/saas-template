import { z } from 'zod';

export const UpdateBarbershopInputValidation = z.object({
  id: z.string(),
  name: z.string().min(8).max(80).optional(),
  description: z.string().min(8).max(255).optional(),
  picture: z.string().optional(),
});

export type IUpdateBarbershopInput = z.infer<
  typeof UpdateBarbershopInputValidation
>;
