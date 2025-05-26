import { genoxxApi } from '../../config/api/genoxxApi';
import { ConsultaUnidadesRequest } from '../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.request';
import { ConsultaUnidadesResponse } from '../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.response';

export const getConsultaUnidades = async (
  props: ConsultaUnidadesRequest,
): Promise<ConsultaUnidadesResponse> => {
  try {
    const {data} = await genoxxApi.post<ConsultaUnidadesResponse>(
      '/flota/listar_consulta_unidades',
      {
        vl_empr_codigo: props.vl_empr_codigo,
        txt_nro_placa: props.txt_nro_placa,
        cbo_bus_estado: props.cbo_bus_estado,
        cbo_tipo_vehiculo: props.cbo_tipo_vehiculo,
        cbo_bus_proyectos: props.cbo_bus_proyectos,
        cbo_bus_unid_obra: props.cbo_bus_unid_obra,
        txt_cod_destinatario: props.txt_cod_destinatario,
        txt_bus_fechas: props.txt_bus_fechas,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
