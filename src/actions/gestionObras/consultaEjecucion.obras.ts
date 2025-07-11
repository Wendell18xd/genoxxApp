import {genoxxApi} from '../../config/api/genoxxApi';
import {ListarConsultaEjecucionRequest} from '../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.request';
import {ListarConsultaEjecucionResponse} from '../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.response';
import {ProyectosObrasRequest} from '../../infrastructure/interfaces/gestionObras/obras.request';
import {ProyectosObrasResponse} from '../../infrastructure/interfaces/gestionObras/obras.response';
import {ActividadesObrasRequest} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.request';
import {ActividadesObrasResponse} from '../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

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

export const listadoProyectosObras = async (
  props: ProyectosObrasRequest,
): Promise<ProyectosObrasResponse> => {
  try {
    console.log(props);
    const {data} = await genoxxApi.post<ProyectosObrasResponse>(
      '/obras/listar_proyectos_obras',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        vl_proy_tipo: props.vl_proy_tipo,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const listarActividadesObras = async (
  props: ActividadesObrasRequest,
): Promise<ActividadesObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ActividadesObrasResponse>(
      '/obras/listar_actividades_ejecucion_obras',
      {
        vg_empr_pais: props.vg_empr_pais,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
