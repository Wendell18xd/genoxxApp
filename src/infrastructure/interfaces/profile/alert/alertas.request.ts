import {genoxxApi} from '../../../../config/api/genoxxApi';

interface EnviarAlertaPayload {
  txt_tipo: string;
  txt_telefono: string;
  txt_comentario: string;
}

export const enviarAlerta = async (payload: EnviarAlertaPayload) => {
  try {
    const {data} = await genoxxApi.post('/master/grabar_alertas', payload);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.mensaje || 'Error al enviar alerta');
  }
};
