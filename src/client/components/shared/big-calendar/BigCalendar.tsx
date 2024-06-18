import React from 'react';

import dayjs from 'dayjs';
import {
  AbstractIntlMessages,
  useLocale,
  useMessages,
  useTranslations,
} from 'next-intl';
import {
  Calendar,
  CalendarProps,
  Event,
  Views,
  dayjsLocalizer,
} from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type BigCalendarProps<T extends Event> = Omit<CalendarProps<T>, 'localizer'> & {
  dragAndDrop?: true;
} & withDragAndDropProps<T>;

const BigCalendar = <T extends Event>(props: BigCalendarProps<T>) => {
  const t = useTranslations('big-calendar');
  const localizedMessages = useMessages()[
    'big-calendar'
  ] as AbstractIntlMessages;
  const messages = {
    ...localizedMessages,
    showMore: (count: number) => t('showMore', { count }),
  };
  const locale = useLocale();
  const localizer = dayjsLocalizer(dayjs);

  if (props.dragAndDrop) {
    const DnDCalendar = withDragAndDrop<T>(Calendar);
    return (
      <DnDCalendar
        className="text-white"
        localizer={localizer}
        messages={messages}
        culture={locale}
        style={{ height: 'calc(100vh - 64px)' }}
        dayLayoutAlgorithm="no-overlap"
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        step={60}
        popup
        selectable
        {...props}
      />
    );
  }

  return (
    <Calendar
      className="text-white"
      localizer={localizer}
      messages={messages}
      culture={locale}
      style={{ height: 'calc(100vh - 64px)' }}
      dayLayoutAlgorithm="no-overlap"
      views={[Views.DAY, Views.WEEK, Views.MONTH]}
      step={60}
      popup
      selectable
      {...props}
    />
  );
};

export default BigCalendar;
