import {genoxxApi} from '../../config/api/genoxxApi';
import {ActividadesPartidasObrasRequest} from '../../infrastructure/interfaces/buscadores/partida-actividades/partidas.actividades.request';
import {ActividadesPartidasObrasResponse} from '../../infrastructure/interfaces/buscadores/partida-actividades/partidas.actividades.response';

export const getActividadesPartidas = async (
  props: ActividadesPartidasObrasRequest,
): Promise<ActividadesPartidasObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ActividadesPartidasObrasResponse>(
      '/obras/get_actividades_partidas',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vl_part_negocio: props.vl_part_negocio,
        vl_buscar_tabla: props.vl_buscar_tabla,
        vl_regi_codigo: props.vl_regi_codigo,
        vl_tipo: props.vl_tipo,
        vl_zona: props.vl_zona,
        vl_part_tipo: props.vl_part_tipo,
        vl_part_clase: props.vl_part_clase,
      },
    );

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
