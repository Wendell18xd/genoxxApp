import BackgroundActions from 'react-native-background-actions';
import {checkInternet} from '../../helper/network';
import {OfflineQueueItem, processQueue} from '../processor/queueProcessor';
import {globalColors} from '../../styles/globalStyle';
import {listRows} from '../database/database';
import {AppState, Platform} from 'react-native';

const isAppInForeground = () => AppState.currentState === 'active';

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
  taskTitle: 'Genoxx trabajos en cola',
  taskDesc: '',
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
  const androidVersion = Platform.Version;

  if (!BackgroundActions.isRunning()) {
    console.log(isAppInForeground());

    if (Platform.OS === 'android' && androidVersion >= '34') {
      if (!isAppInForeground()) {
        console.log(
          '[startQueueBackgroundSync] No se puede iniciar el servicio: App no está en foreground',
        );
        return;
      }
    }

    try {
      await BackgroundActions.start(backgroundTask, options);
    } catch (e) {
      console.log(
        '[startQueueBackgroundSync] Error al iniciar background task',
        e,
      );
    }
  }
};

export const stopQueueBackgroundSync = async () => {
  if (BackgroundActions.isRunning()) {
    await BackgroundActions.stop();
  }
};
