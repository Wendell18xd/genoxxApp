import { genoxxApi } from '../../config/api/genoxxApi';
import { PlacaRequest } from '../../infrastructure/interfaces/buscadores/placa/placa.request';
import { PlacaResponse } from '../../infrastructure/interfaces/buscadores/placa/placa.response';


export const getPlaca = async (
  props: PlacaRequest,
): Promise<PlacaResponse> => {
  try {
    const {data} = await genoxxApi.post<PlacaResponse>(
      '/flota/get_patente',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_buscar: props.txt_buscar,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
