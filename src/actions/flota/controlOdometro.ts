import {genoxxApi} from '../../config/api/genoxxApi';
import {
  ConsultaConductorPlacaRequest,
  ConsultaPlacaConductorRequest,
  SaveControlOdometroRequest,
} from '../../infrastructure/interfaces/flota/controlOdometro/controlOdometro.request';
import {
  ConsultaConductorPlacaResponse,
  ConsultaPlacaConductorResponse,
  SaveControlOdometroResponse,
} from '../../infrastructure/interfaces/flota/controlOdometro/controlOdometro.response';

export const getConsultaConductorPlaca = async (
  props: ConsultaConductorPlacaRequest,
): Promise<ConsultaConductorPlacaResponse> => {
  try {
    const {data} = await genoxxApi.post<ConsultaConductorPlacaResponse>(
      '/flota/listar_conductor_placa',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_nro_placa: props.txt_nro_placa,
      },
    );

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getConsultaPlacaConductor = async (
  props: ConsultaPlacaConductorRequest,
): Promise<ConsultaPlacaConductorResponse> => {
  try {
    const {data} = await genoxxApi.post<ConsultaPlacaConductorResponse>(
      '/flota/get_placa_conductor',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_codi_perfil: props.txt_codi_perfil,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const saveControlOdometro = async (
  props: SaveControlOdometroRequest,
): Promise<SaveControlOdometroResponse> => {
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
    formData.append('vg_empr_codigo', props.vl_empr_codigo);
    formData.append('placa', props.placa);
    formData.append('txt_codi_perfil', props.txt_codi_perfil);
    formData.append('txt_user', props.txt_user);
    formData.append('txt_kilometraje', props.txt_kilometraje);
    formData.append('txt_comentario', props.txt_comentario);
    formData.append('vl_coord_x', props.vl_coord_x);
    formData.append('vl_coord_y', props.vl_coord_y);
    formData.append('vl_fotos', props.vl_fotos);

    const {data} = await genoxxApi.post<SaveControlOdometroResponse>(
      '/flota/save_odometraje',
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

