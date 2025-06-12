import {genoxxApi} from '../../config/api/genoxxApi';
import {ActividadesObrasRequest} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.request';
import {ActividadesObrasResponse} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';
import {SaveEjecucionObrasRequest} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/save.ejecucion.obras.request';
import {SaveEjecucionObrasResponse} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/save.ejecucion.obras.response';

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
