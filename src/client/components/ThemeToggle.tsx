'use client';

import React from 'react';

import { Dropdown, MenuProps } from 'antd';
import { Laptop, Moon, SunMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('theme');

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setTheme(key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: (
        <div className="flex items-center">
          <SunMedium className="text-orange-500 mr-2 size-5" />
          <span>{t('light')}</span>
        </div>
      ),
    },
    {
      key: 'dark',
      label: (
        <div className="flex items-center">
          <Moon className="text-blue-500 mr-2 size-5" />
          <span>{t('dark')}</span>
        </div>
      ),
    },
    {
      key: 'system',
      label: (
        <div className="flex items-center">
          <Laptop className="stroke-1.5 mr-2 size-5" />
          <span>{t('system')}</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [theme ?? 'system'],
        onClick,
      }}
    >
      <button className="btn">
        <SunMedium className="text-orange-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="text-blue-500 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>
    </Dropdown>
  );
}
