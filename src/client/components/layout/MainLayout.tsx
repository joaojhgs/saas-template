import React, { ReactNode } from 'react';

import { Layout } from 'antd';

import { SiteHeader } from './header/SiteHeader';
import SiderComponent from './sider/SiderComponent';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderComponent />
      <Layout>
        <SiteHeader />
        {children}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
