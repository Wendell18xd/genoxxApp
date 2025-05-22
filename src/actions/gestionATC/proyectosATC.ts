import {genoxxApi} from '../../config/api/genoxxApi';
import { ProyectoResponse } from '../../infrastructure/interfaces/gestionATC/proyecto/proyectoATC.response';
import {ProyectoRequest} from '../../infrastructure/interfaces/gestionATC/proyecto/proyectoATC.resquest';

export const getProyecto = async (
  props: ProyectoRequest,
): Promise<ProyectoResponse> => {
  try {
    const {data} = await genoxxApi.post<ProyectoResponse>(
      '/abonados/listar_proyectos_atc',
      {
        vl_empr_codigo: props.vl_empr_codigo,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
