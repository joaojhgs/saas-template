import { useRouter } from 'next/navigation';

import { cn } from '@utils/tailwind';
import { LayoutDashboard } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useSiderStore from '@/client/hooks/stores/useSiderStore';

import { useIsClientMobile } from './useMediaQuery';

interface ISiderMenuItem {
  icon: React.ReactNode;
  path: string;
  label: Parameters<ReturnType<typeof useTranslations<'sider'>>>[0];
  className?: string;
}

const useSiderMenuItems = () => {
  const router = useRouter();
  const t = useTranslations('sider');
  const { setOpenMenu, openMenu } = useSiderStore();
  const isMobile = useIsClientMobile();

  const menuPages: ISiderMenuItem[] = [
    {
      path: '/admin/schedules',
      label: 'menu.dashboard',
      icon: <LayoutDashboard className="!my-auto" />,
    },
  ];

  return menuPages.map((item) => {
    return {
      key: item.path,
      icon: item.icon,
      label: t(item.label),
      className: cn(
        '!m-0 !flex !w-full !items-center !justify-center !p-0 !text-center !align-middle [&>.ant-menu-title-content]:!h-full',
        !openMenu && '[&_span]:!hidden',
        item.className,
      ),
      onClick: () => {
        router.push(item.path);
        if (isMobile) setOpenMenu(false);
      },
    };
  });
};

export default useSiderMenuItems;
