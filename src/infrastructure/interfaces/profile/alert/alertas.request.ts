import {genoxxApi} from '../../../../config/api/genoxxApi';

interface EnviarAlertaResponse {
  vg_empr_codigo: string;
  vg_usua_codigo: string;
  txt_trab_codigo: string;
  txt_tipo: string;
  txt_telefono: string;
  txt_comentario: string;
}

export const enviarAlerta = async (payload: EnviarAlertaResponse) => {
  try {
    console.log('Enviando alerta:', payload);
    const {data} = await genoxxApi.post('/master/grabar_alertas', payload);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.mensaje || 'Error al enviar alerta');
  }
};
