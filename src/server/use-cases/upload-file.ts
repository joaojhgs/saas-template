'use server';

import { createClient } from '@/lib/supabase/server-client';

// Create Supabase client
const supabase = createClient();

// Upload file using standard upload
export async function uploadFile(fileName: string, file: File) {
  const { data, error } = await supabase.storage
    .from('barbershop')
    .upload('public/' + fileName, file);
  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    console.log(data);
  }
  return { data, error };
}
