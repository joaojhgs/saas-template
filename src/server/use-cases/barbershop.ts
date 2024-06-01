'use server';

import { IUpdateBarbershopInput, ServerActionInjected } from '@/schemas';

import serverActionHof from '../server-action';

export const getBarbershop = serverActionHof(
  async ({ supabase }: ServerActionInjected) => {
    const { data, error } = await supabase
      .from('organization')
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
);

export const updateBarbershop = serverActionHof(
  async ({
    supabase,
    values,
  }: ServerActionInjected<IUpdateBarbershopInput>) => {
    const { data, error } = await supabase
      .from('organization')
      .select('*')
      .eq('id', values?.id)
      .single();

    if (error) throw new Error(error.message);

    const { data: updateData, error: updateError } = await supabase
      .from('organization')
      .update({ ...data, ...values })
      .eq('id', values?.id)
      .single();

    if (updateError) throw new Error(updateError.message);

    return updateData;
  },
);
