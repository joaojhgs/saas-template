import React from 'react';

import SchedullesCalendar from '@/client/components/admin/schedulles/SchedullesCalendar';

interface PageProps {
  // Add any props you need for your page component
}

const Page: React.FC<PageProps> = () => {
  return (
    <div>
      <SchedullesCalendar />
    </div>
  );
};

export default Page;
