'use client';

import { Button, theme } from 'antd';
import { Layout } from 'antd';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

import useIsAdminRoute from '@/client/hooks/useIsAdminRoute';
import useSiderStore from '@/client/hooks/useSiderStore';
import { cn } from '@/utils/tailwind';

import LocaleSwitcher from '../../LocaleSwitcher';
import { MainNav } from './MainNav';

const { Header } = Layout;

export function SiteHeader() {
  const { openMenu, setOpenMenu } = useSiderStore();
  const isAdmin = useIsAdminRoute();
  const token = theme.useToken().token;

  return (
    <Header
      style={{ backgroundColor: token.colorBgLayout }}
      className="sticky top-0 z-40 w-full border-b border-b-slate-200 p-0"
    >
      <div
        className={cn(
          'flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0',
          isAdmin ? 'pr-8' : 'p-8',
        )}
      >
        {isAdmin && (
          <Button
            type="text"
            icon={
              !openMenu ? (
                <PanelRightClose color="white" />
              ) : (
                <PanelRightOpen color="white" />
              )
            }
            onClick={() => setOpenMenu(!openMenu)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        )}
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <LocaleSwitcher />
          </nav>
        </div>
      </div>
    </Header>
  );
}
