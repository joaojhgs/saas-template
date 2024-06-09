'use client';

import { ReactNode, useState } from 'react';

import { Drawer } from 'antd';

interface ISiderMobile {
  children: ReactNode;
}

const SiderMobile = ({ children }: ISiderMobile) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
      {children}
    </Drawer>
  );
};

export default SiderMobile;
