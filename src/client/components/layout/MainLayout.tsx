import React, { ReactNode } from 'react';

import { Layout } from 'antd';

import { SiteHeader } from './header/SiteHeader';
import SiderComponent from './sider/Sider';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout hasSider>
      <SiderComponent />
      <Layout>
        <SiteHeader />
        {children}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
