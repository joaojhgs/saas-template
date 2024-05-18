'use server';

import { IBarber } from '@/utils/interfaces';
import serverActionHof from '../server-action';

export const getBarbershop = serverActionHof<unknown, IBarber>(
  async (supabase, _, _) => {
    const { data, error } = await supabase
      .from('barbershop')
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
);
