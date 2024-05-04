import { NamespaceKeys, useTranslations } from 'next-intl';
import { z } from 'zod';

import { makeZodI18nMap } from '@/lib/zod/zodErrorMap';

export const useI18nZodErrors = (
  formName?: NamespaceKeys<IntlMessages, keyof IntlMessages>,
) => {
  const t = useTranslations('zod');
  const tForm = useTranslations(formName);
  const tCustom = useTranslations('customErrors');
  z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
};
