import { z } from 'zod';

import { UpdateBarbershopInputValidation } from '@/schemas/barbershop';

export type IBarbershop = {
  name: string;
  picture: string;
  description: string;
  id: string;
};

export type IUpdateBarbershopInput = z.infer<
  typeof UpdateBarbershopInputValidation
>;
