import { PropsWithChildren } from 'react';

import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { colorsToken } from '@/client/constants';
import { defaultLocale, languages } from '@/locale';

import { AntdProvider } from './AntdProvider';

export type ProviderProps = PropsWithChildren<{
  locale: string;
}>;

export function AntdConfigProvider({ children, locale }: ProviderProps) {
  dayjs.locale(locale === 'pt-BR' ? 'pt-br' : 'en');

  return (
    <AntdProvider>
      <ConfigProvider
        locale={languages[locale ?? defaultLocale].antd}
        theme={{
          token: colorsToken,
        }}
      >
        {children}
      </ConfigProvider>
    </AntdProvider>
  );
}

export default function ThemeProvider(props: ProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      <AntdConfigProvider {...props} />
    </NextThemeProvider>
  );
}
