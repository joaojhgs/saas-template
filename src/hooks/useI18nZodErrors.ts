import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { makeZodI18nMap } from '@/lib/zod/zodErrorMap';

export const useI18nZodErrorsForm = (
  tForm: ReturnType<typeof useTranslations>,
) => {
  const t = useTranslations('zod');
  const tCustom = useTranslations('customErrors');
  z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
  return tForm;
};
