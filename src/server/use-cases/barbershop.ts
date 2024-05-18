'use server';

import { IBarbershop } from '@/types';

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
