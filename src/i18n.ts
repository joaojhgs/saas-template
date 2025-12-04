import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from './locale';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || defaultLocale;
  return {
    locale: currentLocale,
    messages: {
      ...(await import(`./locale/messages/${currentLocale}.json`)).default,
      ...(await import(`./locale/messages/zod/${currentLocale}.json`)).default,
    },
    timeZone: 'America/Sao_Paulo',
  };
});
