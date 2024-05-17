'use server';

import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import { makeZodI18nMap } from '@/lib/zod/zod-error-map';

// Todo: add return of "getTranslations" so the use case can translate it's custom errors
// Todo: separate zod customErros from our use case errors, try to use error codes shared between front and back;
export const initErrorsAndTranslations = async () => {
  const t = await getTranslations('zod');
  const tCustom = await getTranslations('customValidationErrors');
  z.setErrorMap(makeZodI18nMap({ t, tCustom }));
  return await getTranslations('results');
};
