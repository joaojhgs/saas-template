'use client';

import { ReactNode } from 'react';

import { Drawer, theme } from 'antd';

import useSiderStore from '@/client/hooks/stores/useSiderStore';

interface ISiderMobile {
  children: ReactNode;
}

const SiderMobile = ({ children }: ISiderMobile) => {
  const { openMenu, setOpenMenu } = useSiderStore();
  const token = theme.useToken().token;

  return (
    <Drawer
      open={openMenu}
      onClose={() => setOpenMenu(false)}
      style={{
        backgroundColor: token.colorBgBase,
      }}
      placement="left"
    >
      {children}
    </Drawer>
  );
};

export default SiderMobile;
