'use client';

import React, { useState } from 'react';

import dayjs from 'dayjs';

import useBarberSchedules from '@/client/hooks/useBarberSchedules';
import usePersistStore from '@/client/hooks/usePersistStore';

import BigCalendar from '../../shared/big-calendar/BigCalendar';
import NewScheduleModal from './NewScheduleModal';

interface SchedullesCalendarProps {
  // Define your component props here
}

const SchedullesCalendar: React.FC<SchedullesCalendarProps> = () => {
  // Persist choice of calendar view
  const { setCalendarView, calendarView } = usePersistStore();
  // No need to persist the date
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [createUpdateModal, setCreateUpdateModal] = useState<{
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
  }>();
  const { data } = useBarberSchedules();

  return (
    <>
      <BigCalendar
        className="text-white"
        date={calendarDate}
        view={calendarView}
        onView={setCalendarView}
        onNavigate={setCalendarDate}
        events={data?.data?.map((item) => ({
          ...item,
          start: new Date(item.start_time ?? ''),
          end: new Date(item.end_time ?? ''),
          title: `${item.client_name}`,
        }))}
        style={{ height: '100%' }}
        onSelectEvent={(e) => {
          console.log('onSelectEvent', e);
        }} // Click event (show details)
        onSelectSlot={(e) => {
          console.log('onSelectSlot', e);
          setCreateUpdateModal({ start: dayjs(e.start), end: dayjs(e.end) });
        }} // Select time to schedulle
        onEventDrop={(e) => {
          console.log('onEventDrop', e);
        }} // Drag and drop
        onEventResize={(e) => {
          console.log('onEventResize', e);
        }} // Resize event time
      />
      <NewScheduleModal
        visible={createUpdateModal}
        onCancel={() => setCreateUpdateModal(undefined)}
      />
    </>
  );
};

export default SchedullesCalendar;
