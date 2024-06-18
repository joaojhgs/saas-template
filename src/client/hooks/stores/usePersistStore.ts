import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistState {
  persistedProperty: string;
  setPersistedProperty: (data: string) => void;
}

/*
  This is an example of zustand store.
  This one specifically is using the persistance of localstorage, use it only for states you want to persist locally after the user refresh the page.
*/

const usePersistStore = create<PersistState>()(
  persist(
    (set) => ({
      persistedProperty: 'teste',
      setPersistedProperty: (persistedProperty) =>
        set(() => ({ persistedProperty })),
    }),
    {
      name: 'persist-store',
    },
  ),
);

export default usePersistStore;
