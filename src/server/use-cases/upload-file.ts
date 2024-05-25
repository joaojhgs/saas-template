'use server';

import crypto from 'crypto';

import { createClient } from '@/lib/supabase/server-client';

interface IInput {
  bucketName: string;
  file: File;
}

export const uploadFile = async (values: IInput) => {
  const supabase = createClient();

  const uuid = crypto.randomUUID();

  const { data, error } = await supabase.storage
    .from(values.bucketName)
    .upload('public/' + uuid, values?.file as File, {
      upsert: true,
    });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
