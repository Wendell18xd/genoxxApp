import { genoxxApi } from '../../../config/api/genoxxApi';
import { EnviarAlertaResponse } from '../../../infrastructure/interfaces/profile/alert/alertas.request';
import { AlertaResponse } from '../../../infrastructure/interfaces/profile/alert/alertas.response';


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

export const enviarAlerta = async (payload: EnviarAlertaResponse) => {
  try {
    console.log('Enviando alerta:', payload);
    const {data} = await genoxxApi.post('/master/grabar_alertas', payload);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.mensaje || 'Error al enviar alerta');
  }
};
