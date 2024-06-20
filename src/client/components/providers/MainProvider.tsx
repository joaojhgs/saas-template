import React, { ReactNode } from 'react';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

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
        <ThemeProvider locale={locale}>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
};

export default MainProvider;
