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
  const breadcrumbItems = pathname
    .split('/')
    .slice(2)
    .map((item, index) => {
      return {
        key: index,
        breadcrumbName: item.charAt(0).toUpperCase() + item.slice(1),
        href: `/${item}`,
      };
    });

  return (
    <Layout
      style={{ padding: '0 48px 48px' }}
      className="min-h-[calc(100vh-64px)]"
    >
      <Breadcrumb
        className="my-[16px]"
        items={breadcrumbItems}
        itemRender={(route) => (
          <>
            <a href={route && route.href}>{route && route.breadcrumbName}</a>
          </>
        )}
      />
      <Content className="h-full rounded-lg">{children}</Content>
    </Layout>
  );
};

export default AdminPagesLayout;
