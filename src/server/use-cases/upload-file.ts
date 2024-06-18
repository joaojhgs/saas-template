import crypto from 'crypto';
import 'server-only';

import { createUserClient } from '@/lib/supabase/server-client';

interface IInput {
  bucketName: string;
  file: File;
}

/*
  This is a function that is strictly used in the server side, called by a API route.
  It doesn't use the serverActionHof and uses the `import 'server-only'` instead of `use server`
  Since files are not Serializable by React yet they can't be sent to server actions.
  The `import 'server-only'` ensures it will only be imported in another server-side code, like an API route or other use cases.
*/

export const uploadFile = async (values: IInput) => {
  const uuid = crypto.randomUUID();
  const supabase = createUserClient();
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
