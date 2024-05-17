import React from 'react';

import AdminPagesLayout from '@/client/components/layout/AdminPagesLayout';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: LayoutProps) {
  return <AdminPagesLayout>{children}</AdminPagesLayout>;
}
