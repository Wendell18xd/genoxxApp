import {create} from 'zustand';

interface SessionState {
  isAuthenticated: boolean;
  lastActive: number;
  expiredByInactivity: boolean;
  setAuthenticated: (value: boolean) => void;
  updateLastActive: () => void;
  logout: (options?: {expired?: boolean}) => void;
  clearInactivityFlag: () => void;
}

export const useSessionStore = create<SessionState>(set => ({
  isAuthenticated: false,
  lastActive: Date.now(),
  expiredByInactivity: false,

  setAuthenticated: value =>
    set({
      isAuthenticated: value,
      lastActive: Date.now(),
      expiredByInactivity: false,
    }),

  updateLastActive: () => set({lastActive: Date.now()}),

  logout: options => {
    set({
      isAuthenticated: false,
      lastActive: 0,
      expiredByInactivity: options?.expired ?? false,
    });
  },

  clearInactivityFlag: () => set({expiredByInactivity: false}),
}));
