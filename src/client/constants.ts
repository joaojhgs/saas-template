import Theme from '@ant-design/cssinjs/lib/theme/Theme';
import darkAlgorithm from 'antd/lib/theme/themes/dark';
import seed from 'antd/lib/theme/themes/seed';
import { useTranslations } from 'next-intl';

export interface NavItem {
  title: React.ReactNode;
  href: string;
}

export const getNavItems = (
  isAdmin: boolean,
  t: Awaited<ReturnType<typeof useTranslations<'nav'>>>,
) => {
  if (isAdmin) return [];

  return [
    {
      title: t('menu'),
      href: '/',
    },
  ];
};

export const themeToken = {
  colorPrimary: '#ea9010',
  colorInfo: '#ea9010',
  colorBgBase: '#181717',
};

const derivativeTheme = new Theme([darkAlgorithm]);

export const colorsToken = Object.fromEntries(
  Object.entries(
    derivativeTheme.getDerivativeToken(Object.assign(seed, themeToken)),
  ).filter(
    ([key, value]) =>
      key &&
      typeof value === 'string' &&
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
  ),
);
