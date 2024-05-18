import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BigCalendarView } from '@/types';

interface PersistState {
  openMenu: boolean;
  setOpenMenu: (data: boolean) => void;
  toggleMenu: () => void;
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
      openMenu: true,
      setOpenMenu: (data) => set(() => ({ openMenu: data })),
      toggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
      calendarView: 'week',
      setCalendarView: (data) => set(() => ({ calendarView: data })),
    }),
    {
      name: 'persist-store',
    },
  ),
);

export default usePersistStore;
