// src/services/processor/queueProcessor.ts

import {saveObraEjecutada} from '../../../actions/gestionObras/ejecucion.obras';
import {checkInternet} from '../../helper/network';
import {deleteRowById, listRows} from '../database/database';

export interface OfflineQueueItem {
  id: number;
  type: string;
  payload: string; // JSON.stringify(...)
}

// Mapeo de tipos a funciones (cada una debe devolver Promise<void>)
const queueHandlers: Record<string, (payload: any) => Promise<void>> = {
  saveObraEjecutada: async (payload: any) => {
    await saveObraEjecutada(payload);
  },
  // Agrega más handlers aquí en el futuro
  // saveInspeccion: async (payload: any) => { ... },
  // uploadFoto: async (payload: any) => { ... },
};

let isProcessing = false;

export const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;

  try {
    const tieneInternet = await checkInternet();
    if (!tieneInternet) return;

    const items = await listRows<OfflineQueueItem>('offline_queue');

    for (const item of items) {
      try {
        const payload = JSON.parse(item.payload);
        const handler = queueHandlers[item.type];

        if (handler) {
          await handler(payload);
          await deleteRowById('offline_queue', 'id', item.id);
          console.log(`[Queue] Procesado item #${item.id} (${item.type})`);
        } else {
          console.warn(`[Queue] Handler no definido para: ${item.type}`);
        }
      } catch (err) {
        console.error(`[Queue] Error procesando item #${item.id}:`, err);
      }
    }
  } finally {
    isProcessing = false;
  }
};
