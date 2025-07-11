import {genoxxApi} from '../../config/api/genoxxApi';
import { ConsultaInspeccionRequest } from '../../infrastructure/interfaces/prevencion/consultaInspeccion/consultaInspeccion.request';
import { ConsultaInspeccionResponse } from '../../infrastructure/interfaces/prevencion/consultaInspeccion/consultaInspeccion.response';

export const getConsultaInspeccion = async (
  props: ConsultaInspeccionRequest,
): Promise<ConsultaInspeccionResponse> => {
  try {
    console.log('getConsultaInspeccion', props);
    const {data} = await genoxxApi.post<ConsultaInspeccionResponse>(
      '/inspecciones/get_consultas_de_inspecciones',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_fecha_inicio: props.txt_fecha_inicio,
        txt_fecha_final: props.txt_fecha_final,
        txt_nivel_acceso: props.txt_nivel_acceso,
        txt_registro_usuario: props.txt_registro_usuario,
        txt_cod_inspeccion: props.txt_cod_inspeccion,
        txt_cadena_where: props.txt_cadena_where,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
