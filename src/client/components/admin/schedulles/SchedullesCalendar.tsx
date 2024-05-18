'use client';

import React, { useState } from 'react';

import dayjs from 'dayjs';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import usePersistStore from '@/client/hooks/usePersistStore';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = dayjsLocalizer(dayjs);

interface SchedullesCalendarProps {
  // Define your component props here
}

const today = new Date();
const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: today,
    end: new Date(today.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Team lunch',
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0,
      0,
    ), // 12:00 PM
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      13,
      0,
      0,
    ), // 1:00 PM
    resourceId: 2,
  },
  // Add more events as needed
];

const SchedullesCalendar: React.FC<SchedullesCalendarProps> = () => {
  // Persist choice of calendar view
  const { setCalendarView, calendarView } = usePersistStore();
  // No need to persist the date
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <div>
      <DnDCalendar
        className="text-white"
        localizer={localizer}
        date={calendarDate}
        view={calendarView}
        onView={setCalendarView}
        onNavigate={setCalendarDate}
        events={events}
        style={{ height: 'calc(100vh - 64px)' }}
        popup
        // {...{
        //   selectable: !!user?.tatuador_id,
        //   draggable: !!user?.tatuador_id,
        //   resizable: !!user?.tatuador_id,
        // }}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        step={60}
        onSelectEvent={(e) => {
          console.log('onSelectEvent', e);
        }} // Click event (show details)
        onSelectSlot={(e) => {
          console.log('onSelectSlot', e);
        }} // Select time to schedulle
        // onEventDrop={(e) => {
        //   console.log('onEventDrop', e);
        // }} // Drag and drop
        // onEventResize={(e) => {
        //   console.log('onEventResize', e);
        // }} // Resize event time
      />
    </div>
  );
};

export default SchedullesCalendar;
