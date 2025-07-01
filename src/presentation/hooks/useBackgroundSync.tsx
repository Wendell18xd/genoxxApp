import {useEffect} from 'react';
import {startQueueBackgroundSync} from '../services/background/queueSyncTask';
import {useNetInfoReal} from '../services/background/netinfoListener';
import {processQueue} from '../services/processor/queueProcessor';

export const useBackgroundSync = () => {
  // Reacciona inmediatamente al reconectar
  useNetInfoReal(() => {
    console.log('[BackgroundSync] Internet restaurado, procesando cola...');
    processQueue();
  });

  useEffect(() => {
    startQueueBackgroundSync(); // inicia loop background
  }, []);
};
