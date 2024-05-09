'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

type AdminPagesLayoutProps = {
  children: ReactNode;
};

const AdminPagesLayout: React.FC<AdminPagesLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const breadcrumbItems = pathname.split('/').map((item, index) => {
    return {
      key: index,
      breadcrumbName: item,
      href: `/${item}`,
    };
  });

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb
        style={{ margin: '16px 0' }}
        items={breadcrumbItems}
        itemRender={(route) => (
          <>
            <a href={route && route.href}>{route && route.breadcrumbName}</a>
          </>
        )}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AdminPagesLayout;
