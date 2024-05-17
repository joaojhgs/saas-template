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
