import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { cn } from '@/utils/tailwind';

import Icons from '../../Icons';

interface ISiderMenuItem {
  icon: React.ReactNode;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  className?: string;
}

export const menuPages: ISiderMenuItem[] = [
  {
    path: '/admin/schedules',
    label: 'sider.menu.schedules',
    icon: <Icons.Calendar />,
  },
  {
    path: '/admin/barbershop',
    label: 'sider.menu.barbershop',
    icon: <Icons.Settings />,
  },
];

export const generateMenuItems = (
  router: ReturnType<typeof useRouter>,
  t: ReturnType<typeof useTranslations>,
  onClick?: () => void,
) => {
  return menuPages.map((item) => {
    return {
      key: item.path,
      icon: item.icon,
      label: t(item.label),
      className: cn('text-center', item.className),
      onClick: () => {
        router.push(item.path);
        onClick?.();
      },
    };
  });
};
