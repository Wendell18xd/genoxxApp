import { genoxxApi } from '../../config/api/genoxxApi';
import { PersonalRequest } from '../../infrastructure/interfaces/buscadores/personal/personal.request';
import { PersonalResponse } from '../../infrastructure/interfaces/buscadores/personal/personal.response';


export const getPersonal = async (
  props: PersonalRequest,
): Promise<PersonalResponse> => {
  try {
    const {data} = await genoxxApi.post<PersonalResponse>(
      '/master/get_personal',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_buscar: props.txt_buscar,
        txt_cod_trabajador: props.txt_cod_trabajador,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
