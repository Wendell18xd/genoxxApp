import {genoxxApi} from '../../config/api/genoxxApi';
import {ConsultaInspeccionesRequest} from '../../infrastructure/interfaces/flota/consultaInspecciones/consultaInspecciones.request';
import {ConsultaInspeccionesResponse} from '../../infrastructure/interfaces/flota/consultaInspecciones/consultaInspecciones.response';

export const getConsultaInspecciones = async (
  props: ConsultaInspeccionesRequest,
): Promise<ConsultaInspeccionesResponse> => {
  try {
    console.log('getConsultaInspecciones', props);
    const {data} = await genoxxApi.post<ConsultaInspeccionesResponse>(
      '/flota/get_inspecciones_historial',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_nro_placa: props.txt_nro_placa,
        txt_bus_fecha_desde: props.txt_bus_fecha_desde,
        txt_bus_fecha_hasta: props.txt_bus_fecha_hasta,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
