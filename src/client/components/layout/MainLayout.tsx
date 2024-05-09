'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Header } from 'antd/es/layout/layout';

import usePersistStore from '@/client/hooks/usePersistStore';

import { SiteHeader } from '../SiteHeader';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { openMenu, setOpenMenu } = usePersistStore();
  const pathname = usePathname();
  const isAdmin = pathname.includes('admin');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isAdmin && (
        <Sider
          collapsible
          collapsed={openMenu}
          onCollapse={(value) => setOpenMenu(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="vertical"
            items={[
              { key: '1', label: 'Option 1' },
              { key: '2', label: 'Option 2' },
            ]}
          />
        </Sider>
      )}
      <Layout>
        <Header style={{ padding: 0 }}>
          <SiteHeader />
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
