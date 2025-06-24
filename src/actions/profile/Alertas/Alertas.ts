import {genoxxApi} from '../../../config/api/genoxxApi';
import {EnviarAlertaRequest} from '../../../infrastructure/interfaces/profile/alert/alertas.request';
import {AlertaResponse} from '../../../infrastructure/interfaces/profile/alert/alertas.response';

export const getAlertas = async (): Promise<AlertaResponse> => {
  try {
    const {data} = await genoxxApi.post<AlertaResponse>(
      '/master/listar_tipos_alertas',
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const enviarAlerta = async (props: EnviarAlertaRequest): Promise<AlertaResponse> => {
  try {
    const formData = new FormData();

      // Añadir imágenes
    props.vl_fotos.forEach((imageUri) => {
      formData.append('vl_fotos[]', {
        uri: imageUri,
        type: 'image/jpeg',
        name: imageUri.split('/').pop(),
      } as any);

    });

    // Añadir los demás campos (puedes renombrarlos según lo que espera tu backend)
    formData.append('vg_empr_codigo', props.vg_empr_codigo);
    formData.append('vg_usua_codigo', props.vg_usua_codigo);
    formData.append('vg_usua_perfil', props.vg_usua_perfil);
    formData.append('txt_tipo', props.txt_tipo);
    formData.append('txt_telefono', props.txt_telefono);
    formData.append('txt_comentario', props.txt_comentario);
    formData.append('txt_audio', props.txt_audio);
    formData.append('vl_coord_x', props.vl_coord_x);
    formData.append('vl_coord_y', props.vl_coord_y);

    const {data} = await genoxxApi.post<AlertaResponse>(
      '/master/grabar_alertas',
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

//     console.log('Enviando alerta:', payload);
//     const {data} = await genoxxApi.post('/master/grabar_alertas', payload);
//     return data;
//   } catch (error: any) {
//     throw new Error(error?.response?.data?.mensaje || 'Error al enviar alerta');
//   }
// };
