import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

export type User = {
  username: string;
  punchLine: string;
};

interface useAccountProps {
  user: User | null;
  theme: 'Dark' | 'Light';
  NotificationOn: boolean;
  firstVisit: boolean;
  updateProfile: (data: User) => void;
  updateTheme: (theme: 'Dark' | 'Light') => void;
  visited: () => void;
  toggleNotification: () => void;
}

const useAccount = create<useAccountProps>()(
  persist(
    (set, get) => ({
      user: null,
      theme: 'Light',
      NotificationOn: true,
      firstVisit: false,

      updateProfile: (data: User) => {
        set(state => ({
          user: { ...state.user, ...data },
        }));
      },

      updateTheme: (theme: 'Dark' | 'Light') => {
        set(() => ({
          theme: theme,
        }));
      },

      visited: () => {
        set(() => ({
          firstVisit: true,
        }));
      },

      toggleNotification: () => {
        set(() => ({
          NotificationOn: !get().NotificationOn,
        }));
      },
    }),
    {
      name: 'account-store', // Key in MMKV
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);

// Export both the hook and the store API
export const accountStore = useAccount;
export default useAccount;
