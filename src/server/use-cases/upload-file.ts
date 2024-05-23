'use server';

import { createClient } from '@/lib/supabase/server-client';

interface IInput {
  fileName: string;
  file: File;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (values: IInput) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('barbershop')
    .upload('public/' + values?.fileName, values?.file as File, {
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
