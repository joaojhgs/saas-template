'use client';

import { Dropdown } from 'antd';

import { Link, usePathname } from '@/client/navigation';
import { languages } from '@/locale';

import Icons from './Icons';

export default function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <Dropdown
      menu={{
        items: Object.entries(languages).map(([lang, setting]) => ({
          key: lang,
          label: (
            <Link href={pathname ?? '/'} locale={lang}>
              {setting.flag}&nbsp;&nbsp;{setting.name}
            </Link>
          ),
        })),
      }}
    >
      <div className="btn" role={'button'} tabIndex={0}>
        <Icons.Languages className="size-5" />
      </div>
    </Dropdown>
  );
}
