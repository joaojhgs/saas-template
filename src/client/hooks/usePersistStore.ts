import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistState {
  openMenu: boolean;
  setOpenMenu: (data: boolean) => void;
  toggleMenu: () => void;
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
    }),
    {
      name: 'persist-store',
    },
  ),
);

export default usePersistStore;
