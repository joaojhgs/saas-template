'use server';

import serverActionHof from '../server-action';

export const getBarbersFromBarbershop = serverActionHof(
  async ({ supabase }) => {
    const { data, error } = await supabase
      .from('barber')
      .select('*')
      .order('name');

    if (error) throw new Error(error.message);
    return data;
  },
);
