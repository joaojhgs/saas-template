'use server';

import { ServerActionInjected } from '@/schemas';

import serverActionHof from '../server-action';

export const getBarbersFromBarbershop = serverActionHof(
  async ({ supabase }: ServerActionInjected) => {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .order('name');

    if (error) throw new Error(error.message);
    return data;
  },
);
