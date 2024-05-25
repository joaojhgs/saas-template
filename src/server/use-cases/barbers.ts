'use server';

import { IBarber } from '@/types';

import serverActionHof from '../server-action';

export const getBarbersFromBarbershop = serverActionHof<
  unknown,
  Array<IBarber>
>(async (supabase) => {
  const { data, error } = await supabase
    .from('barber')
    .select('*')
    .order('name');

  if (error) throw new Error(error.message);
  return data;
});
