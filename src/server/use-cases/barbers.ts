'use server';

import { IBarber } from '@/utils/interfaces';

import serverActionHof from '../server-action';

export const getBarbersFromBarbershop = serverActionHof<unknown, IBarber[]>(
  async (supabase, _, _) => {
    const { data, error } = await supabase
      .from('barber')
      .select('*')
      .order('name');

    if (error) throw new Error(error.message);
    return data;
  },
);
