import { create } from 'zustand';

interface SiderState {
  openMenu: boolean;
  setOpenMenu: (data: boolean) => void;
  toggleMenu: () => void;
}

/*
  This is the SiderMenu zustand store.
*/

const useSiderStore = create<SiderState>()((set) => ({
  openMenu: false,
  setOpenMenu: (data) => set(() => ({ openMenu: data })),
  toggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
}));

export default useSiderStore;
