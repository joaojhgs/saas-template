'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dropdown } from 'antd';
import { useTranslations } from 'next-intl';

import { getNavItems } from '@/client/constants';

import Icons from '../../Icons';

export function MainNav() {
  const t = useTranslations();

  const pathname = usePathname();
  const isAdminPage = pathname.includes('admin');
  const navItems = getNavItems(isAdminPage, t);

  return (
    <div className="flex gap-6 md:gap-10">
      {!isAdminPage && (
        <Link href="/">
          <div className="hidden items-center space-x-2 md:flex">
            <Icons.logo className="size-6" />
            <span className="hidden font-bold sm:inline-block">
              {t('site.title')}
            </span>
          </div>
        </Link>
      )}
      {navItems?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className="hidden items-center font-sans font-bold text-slate-600 hover:text-slate-900 dark:text-slate-100 md:flex"
            >
              {item.title}
            </Link>
          ),
      )}
      {!isAdminPage && (
        <Dropdown
          menu={{
            items: navItems?.map((item) => ({
              key: item.href,
              label: <Link href={item.href}>{item.title}</Link>,
            })),
          }}
        >
          <div className="btn md:hidden">
            <Icons.logo className="mr-2 size-4" />{' '}
            <span className="font-bold">{t('nav.menu')}</span>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
