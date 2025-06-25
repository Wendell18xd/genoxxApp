import BackgroundActions from 'react-native-background-actions';
import {checkInternet} from '../../helper/network';
import {OfflineQueueItem, processQueue} from '../processor/queueProcessor';
import {globalColors} from '../../styles/globalStyle';
import {listRows} from '../database/database';

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

const backgroundTask = async (taskData: any) => {
  console.log('[BG] Tarea de fondo iniciada');

  let delayMs = taskData.delay;

  while (BackgroundActions.isRunning()) {
    console.log('[BG] Verificando cola de datos...');

    const items: OfflineQueueItem[] = await listRows<OfflineQueueItem>(
      'offline_queue',
    );

    if (items.length > 0) {
      console.log(`[BG] Hay ${items.length} elementos en cola`);

      const tieneInternet = await checkInternet();
      if (tieneInternet) {
        console.log('[BG] Conectado a internet. Procesando cola...');
        await processQueue();
        delayMs = 10000; // reducir delay si aún quedan más items por enviar
      } else {
        console.log('[BG] Sin conexión. Esperando...');
        delayMs = taskData.delay;
      }
    } else {
      console.log('[BG] No hay datos en cola. Esperando...');
      delayMs = taskData.delay;
    }

    await sleep(delayMs);
  }

  console.log('[BG] Tarea de fondo detenida');
};

const options = {
  taskName: 'QueueSync',
  taskTitle: 'Sincronizando datos pendientes...',
  taskDesc: 'Enviando datos al servidor',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: globalColors.primary,
  parameters: {
    delay: 60000, // valor inicial
  },
};

export const startQueueBackgroundSync = async () => {
  if (!BackgroundActions.isRunning()) {
    await BackgroundActions.start(backgroundTask, options);
  }
};

export const stopQueueBackgroundSync = async () => {
  if (BackgroundActions.isRunning()) {
    await BackgroundActions.stop();
  }
};
