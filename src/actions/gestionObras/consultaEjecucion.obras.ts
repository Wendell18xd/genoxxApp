import {genoxxApi} from '../../config/api/genoxxApi';
import {ListarConsultaEjecucionRequest} from '../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.request';
import { ListarConsultaEjecucionResponse } from '../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.response';

export const getlistarConsultaEjecucion = async (
  props: ListarConsultaEjecucionRequest,
): Promise<ListarConsultaEjecucionResponse> => {
  try {
    const {data} = await genoxxApi.post<ListarConsultaEjecucionResponse>(
      '/obras/get_listar_ejecucion_obras',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        txt_fecha_inicio: props.txt_fecha_inicio,
        txt_fecha_final: props.txt_fecha_final,
        vl_codi_perfil: props.vl_codi_perfil,
        cbo_elegido: props.cbo_elegido,
        txt_buscar: props.txt_buscar,
        txt_actividad: props.txt_actividad,
        txt_hora: props.txt_hora,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
