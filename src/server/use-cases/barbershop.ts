'use server';

import { IBarbershop, IUpdateBarbershopInput } from '@/schemas';

import serverActionHof from '../server-action';

export const getBarbershop = serverActionHof<unknown, IBarbershop>(
  async (supabase) => {
    const { data, error } = await supabase
      .from('barbershop')
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
);

export const updateBarbershop = serverActionHof<
  IUpdateBarbershopInput,
  IBarbershop
>(async (supabase, _, values) => {
  const { data, error } = await supabase
    .from('barbershop')
    .select('*')
    .eq('id', values?.id)
    .single();

  if (error) throw new Error(error.message);

  const { data: updateData, error: updateError } = await supabase
    .from('barbershop')
    .update({ ...data, ...values })
    .eq('id', values?.id)
    .single();

  if (updateError) throw new Error(updateError.message);

  return updateData;
});
