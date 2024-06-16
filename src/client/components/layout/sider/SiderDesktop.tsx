'use client';

import { ReactNode } from 'react';

import { theme } from 'antd';
import Sider from 'antd/es/layout/Sider';

import useSiderStore from '@/client/hooks/useSiderStore';

interface ISiderDesktop {
  children: ReactNode;
}

const SiderDesktop = ({ children }: ISiderDesktop) => {
  const { openMenu, setOpenMenu } = useSiderStore();
  const token = theme.useToken().token;

  return (
    <Sider
      style={{
        backgroundColor: token.colorBgBase,
      }}
      collapsed={!openMenu}
      onCollapse={(value) => setOpenMenu(value)}
    >
      {children}
    </Sider>
  );
};

export default SiderDesktop;
