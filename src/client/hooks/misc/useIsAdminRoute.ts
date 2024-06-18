'client-only';

import { usePathname } from 'next/navigation';

const useIsAdminRoute = (): boolean => {
  const pathname = usePathname();
  return pathname.includes('admin');
};

export default useIsAdminRoute;
