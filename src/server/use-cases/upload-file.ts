'use server';

import serverActionHof from '../server-action';

interface ITeste {
  fileName: string;
  file: File;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = serverActionHof<ITeste, any>(
  async (supabase, _, values) => {
    const { data, error } = await supabase.storage
      .from('barbershop')
      .upload('public/' + values?.fileName, values?.file as File, {
        upsert: true,
      });
    if (error) {
      throw new Error(error.message);
    }

    return { data, error };
  },
);
