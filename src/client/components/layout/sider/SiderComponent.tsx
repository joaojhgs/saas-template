'use client';

import React from 'react';

import { Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useTranslations } from 'next-intl';

import useIsAdminRoute from '@/client/hooks/useIsAdminRoute';
import usePersistStore from '@/client/hooks/usePersistStore';
import { Link } from '@/client/navigation';

import Icons from '../../Icons';

const SiderComponent: React.FC = () => {
  const { openMenu, setOpenMenu } = usePersistStore();
  const isAdmin = useIsAdminRoute();
  const t = useTranslations('site');
  const token = theme.useToken().token;
  if (!isAdmin) return null;
  return (
    <Sider
      style={{
        backgroundColor: token.colorBgBase,
      }}
      collapsed={openMenu}
      onCollapse={(value) => setOpenMenu(value)}
    >
      <div className="sticky inset-y-0 left-0 h-screen overflow-auto">
        <Link href="/">
          <div className="hidden h-[64px] items-center justify-center space-x-2 align-middle md:flex">
            <Icons.logo className="size-6" />
            {!openMenu && (
              <span className="hidden font-bold sm:inline-block">
                {t('title')}
              </span>
            )}
          </div>
        </Link>
        <Menu
          style={{ backgroundColor: token.colorBgBase }}
          defaultSelectedKeys={['1']}
          mode="vertical"
          items={[
            {
              key: '1',
              label: 'Option 1',
              className: 'text-center',
              icon: <Icons.Accessibility />,
            },
            {
              key: '2',
              label: 'Option 2',
              className: 'text-center',
              icon: <Icons.Activity />,
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default SiderComponent;
