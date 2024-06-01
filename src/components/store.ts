import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { _lStorageSettings } from '@utils/constant';

interface storeType {
  walletAdd: string;
  setWalletAddress: (params?: string) => void;
}

export const useStore = create<storeType>()(
  devtools(
    persist(
      (set) => ({
        // START of useStore

        // set initial values
        walletAdd: '',
        setWalletAddress: (params) => set(() => ({ walletAdd: params })),

        // END of useStore
      }),
      {
        name: _lStorageSettings, // unique name
        /* by default uses localStorage
        - localStorage (persist till manually deleted)
        - sessionStorage (persist till browser closed)
        */
        getStorage: () => localStorage,

        // store partial info in storage
        // partialize: (state) => ({ opened: state.opened }),
      },
    ),
  ),
);
