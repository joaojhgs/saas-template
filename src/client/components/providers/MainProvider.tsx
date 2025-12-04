'use client';

import React, { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

const MainProvider: React.FC<Props> = ({ children, locale, messages }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider locale={locale}>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
};

export default MainProvider;
