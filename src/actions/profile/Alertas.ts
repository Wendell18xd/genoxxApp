import {genoxxApi} from '../../config/api/genoxxApi';
import {AlertaResponse} from '../../infrastructure/interfaces/profile/alert/alertas.response';

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
