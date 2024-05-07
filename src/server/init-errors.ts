import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import { makeZodI18nMap } from '@/lib/zod/zod-error-map';

export const initErrors = async () => {
  const t = await getTranslations('zod');
  const tCustom = await getTranslations('customErrors');
  z.setErrorMap(makeZodI18nMap({ t, tCustom }));
};
