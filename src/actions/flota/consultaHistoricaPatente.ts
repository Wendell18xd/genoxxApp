import { genoxxApi } from '../../config/api/genoxxApi';
import { ConsultaHistoricaPatenteRequest } from '../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.request';
import { ConsultaHistoricaPatenteResponse } from '../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.response';


export const getConsultaHistoricaPatente = async (
  props: ConsultaHistoricaPatenteRequest,
): Promise<ConsultaHistoricaPatenteResponse> => {
  try {
    console.log('getConsultaHistoricaPatente', props);
    const {data} = await genoxxApi.post<ConsultaHistoricaPatenteResponse>(
      '/flota/listar_situacion_vehiculo',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        cbo_bus_tipo: props.cbo_bus_tipo,
        txt_cod_destinatario: props.txt_cod_destinatario,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
