import {genoxxApi} from '../../config/api/genoxxApi';
import {ActividadesObrasRequest} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.request';
import {ActividadesObrasResponse} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';
import {
  SaveEjecucionObrasRequest,
  SaveEjecucionSinObrasResquest,
} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/save.ejecucion.obras.request';
import {
  SaveEjecucionObrasResponse,
  SaveEjecucionSinObrasResponse,
} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/save.ejecucion.obras.response';
import {checkInternet} from '../../presentation/helper/network';
import {enqueueRequest} from '../../presentation/services/database/tablas/OfflineQueueTabla';

export const listarActividadesObras = async (
  props: ActividadesObrasRequest,
): Promise<ActividadesObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ActividadesObrasResponse>(
      '/obras/listar_actividades_ejecucion_obras',
      {
        vg_empr_pais: props.vg_empr_pais,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const saveObraEjecutada = async (
  props: SaveEjecucionObrasRequest,
): Promise<SaveEjecucionObrasResponse> => {
  const tieneInternet = await checkInternet();

  // SI NO HAY INTERNET: guardar en la cola y salir
  if (!tieneInternet) {
    await enqueueRequest('saveObraEjecutada', props);
    return {
      estado: 1,
      mensaje: 'Petición guardada en cola, no hay conexión a internet.',
    };
  }

  try {
    const formData = new FormData();

    // Añadir imágenes
    props.vl_fotos.forEach(imageUri => {
      formData.append('vl_fotos[]', {
        uri: imageUri,
        type: 'image/jpeg',
        name: imageUri.split('/').pop(),
      } as any);
    });

    // Añadir los demás campos (puedes renombrarlos según lo que espera tu backend)
    formData.append('vg_empr_codigo', props.vg_empr_codigo);
    formData.append('vg_usua_perfil', props.vg_usua_perfil);
    formData.append('vl_obse_ejecutado', props.vl_obse_ejecutado);
    formData.append('vl_regi_codigo', props.vl_regi_codigo);
    formData.append('vl_cod_actividad', props.vl_cod_actividad);
    formData.append('vl_coord_x', props.vl_coord_x);
    formData.append('vl_coord_y', props.vl_coord_y);
    formData.append('vl_tramo', props.vl_tramo);
    formData.append('vl_cantidad', props.vl_cantidad);
    formData.append('vl_cierre', props.vl_cierre);
    formData.append('vl_fotos', props.vl_fotos);

    const {data} = await genoxxApi.post<SaveEjecucionObrasResponse>(
      '/obras/save_obra_ejecutada',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const saveEjecucionSinObras = async (
  props: SaveEjecucionSinObrasResquest,
): Promise<SaveEjecucionSinObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<SaveEjecucionSinObrasResponse>(
      '/obras/save_actividad_tecnico',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vg_usua_perfil: props.vg_usua_perfil,
        vg_empr_pais: props.vg_empr_pais,
        txt_actividad: props.txt_actividad,
        txt_comentario: props.txt_comentario,
        txt_situacion: props.txt_situacion,
        txt_hora_inicio: props.txt_hora_inicio,
        txt_hora_fin: props.txt_hora_fin,
        txt_fecha: props.txt_fecha,
        vl_coord_x: props.vl_coord_x,
        vl_coord_y: props.vl_coord_y,
        vl_turno: props.vl_turno,
        vl_transcurrido_inicio: props.vl_transcurrido_inicio,
        vl_transcurrido_fin: props.vl_transcurrido_fin,
        vl_registro_fecha_inicio: props.vl_registro_fecha_inicio,
        vl_automatico: props.vl_automatico,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
