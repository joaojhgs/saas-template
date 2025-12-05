'use client';

import React, { ReactNode } from 'react';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import { TRPCReactProvider } from '@/trpc/client';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

const MainProvider: React.FC<Props> = ({ children, locale, messages }) => {
  return (
    <TRPCReactProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider locale={locale}>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </TRPCReactProvider>
  );
};

export default MainProvider;
