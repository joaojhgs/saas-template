import React, { ReactNode } from 'react';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

const MainProvider: React.FC<Props> = ({ children, locale, messages }) => {
  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider locale={locale}>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default MainProvider;
