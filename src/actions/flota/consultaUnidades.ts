import { genoxxApi } from '../../config/api/genoxxApi';
import { ConsultaUnidadesRequest } from '../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.request';
import { ConsultaUnidadesResponse } from '../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.response';

export const getConsultaUnidades = async (
  props: ConsultaUnidadesRequest,
): Promise<ConsultaUnidadesResponse> => {
  try {
    console.log('getConsultaUnidades', props);
    const {data} = await genoxxApi.post<ConsultaUnidadesResponse>(
      '/flota/listar_consulta_unidades',
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
