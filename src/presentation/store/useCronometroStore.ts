import {create} from 'zustand';

interface CronometroState {
  tiempo: number; // en segundos
  isRunning: boolean;
  intervalId: NodeJS.Timeout | null;

  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const useCronometroStore = create<CronometroState>()((set, get) => ({
  tiempo: 0,
  isRunning: false,
  intervalId: null,

  start: () => {
    const {isRunning, intervalId} = get();
    if (isRunning || intervalId) {
      return;
    }

    const id = setInterval(() => {
      set(state => ({tiempo: state.tiempo + 1}));
    }, 1000);

    set({isRunning: true, intervalId: id});
  },

  pause: () => {
    const {intervalId} = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({isRunning: false, intervalId: null});
    }
  },

  reset: () => {
    const {intervalId} = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({tiempo: 0, isRunning: false, intervalId: null});
  },
}));
