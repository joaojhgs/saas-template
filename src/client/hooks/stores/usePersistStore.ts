import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BigCalendarView } from '@/schemas';

interface PersistState {
  calendarView: BigCalendarView;
  setCalendarView: (data: BigCalendarView) => void;
}

/*
  This is an example of zustand store.
  This one specifically is using the persistance of localstorage, use it only for states you want to persist locally after the user refresh the page.
*/

const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      calendarView: 'week',
      setCalendarView: (data) => set(() => ({ calendarView: data })),
    }),
    {
      name: 'persist-store',
    },
  ),
);

export default usePersistStore;
