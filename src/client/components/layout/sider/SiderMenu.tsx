'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Divider, Menu, theme } from 'antd';
import { useTranslations } from 'next-intl';

import useIsAdminRoute from '@/client/hooks/misc/useIsAdminRoute';
import useSiderMenuItems from '@/client/hooks/misc/useSiderMenuItems';
import useSiderStore from '@/client/hooks/stores/useSiderStore';
import { removeLocale } from '@/utils/helpers';

import Icons from '../../Icons';

const SiderMenu = () => {
  const { openMenu } = useSiderStore();
  const isAdmin = useIsAdminRoute();
  const t = useTranslations();
  const token = theme.useToken().token;
  const items = useSiderMenuItems();
  const pathname = usePathname();

  if (!isAdmin) return null;
  return (
    <div className="sticky inset-y-0 left-0 overflow-auto md:h-screen">
      <Link href="/">
        <div className="flex h-[64px] items-center justify-center space-x-2 align-middle">
          <Icons.Logo className="size-6" />
          {openMenu && (
            <span className="inline-block font-bold">{t('site.title')}</span>
          )}
        </div>
      </Link>
      <Divider className="mt-0 mb-2" />
      <Menu
        style={{ backgroundColor: token.colorBgBase }}
        selectedKeys={[removeLocale(pathname)]}
        mode="vertical"
        items={items}
      />
    </div>
  );
};

export default SiderMenu;
