'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Menu, theme } from 'antd';
import { useTranslations } from 'next-intl';

import useIsAdminRoute from '@/client/hooks/useIsAdminRoute';
import useSiderStore from '@/client/hooks/useSiderStore';
import { removeLocale } from '@/utils/helpers';

import Icons from '../../Icons';
import { generateMenuItems } from './SiderMenuItems';

const SiderMenu = () => {
  const { openMenu, setOpenMenu } = useSiderStore();
  const isAdmin = useIsAdminRoute();
  const t = useTranslations();
  const token = theme.useToken().token;
  const router = useRouter();
  const items = generateMenuItems(router, t, () => {
    setOpenMenu(false);
  });
  const pathname = usePathname();

  if (!isAdmin) return null;
  return (
    <div className="sticky inset-y-0 left-0 overflow-auto md:h-screen">
      <Link href="/">
        <div className="flex h-[64px] items-center justify-center space-x-2 align-middle">
          <Icons.Logo className="size-6" />
          {openMenu && (
            <span className="hidden font-bold sm:inline-block">
              {t('site.title')}
            </span>
          )}
        </div>
      </Link>
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
