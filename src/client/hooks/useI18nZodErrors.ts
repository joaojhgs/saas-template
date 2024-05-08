import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { makeZodI18nMap } from '@/lib/zod/zod-error-map';

/*
  This hook updates the client zod library instance during runtime so it returns errors according to the localization.
  It also returns the form T function for syntax usage in forms/pages.
*/

export const useI18nZodErrorsForm = (
  tForm: ReturnType<typeof useTranslations>,
) => {
  const t = useTranslations('zod');
  const tCustom = useTranslations('customValidationErrors');
  z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
  return tForm;
};
