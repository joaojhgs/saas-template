import React from 'react';

import SchedullesCalendar from '@/client/components/admin/schedules/SchedullesCalendar';

interface PageProps {
  // Add any props you need for your page component
}

const Page: React.FC<PageProps> = () => {
  return (
    <div className="h-full">
      <SchedullesCalendar />
    </div>
  );
};

export default Page;
