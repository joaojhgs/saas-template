'use server';

import { createClient } from '@/lib/supabase/server-client';

const supabase = createClient();

export async function uploadFile(fileName: string, file: File) {
  const { data, error } = await supabase.storage
    .from('barbershop')
    .upload('public/' + fileName, file, {
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}
