import {genoxxApi} from '../../config/api/genoxxApi';
import {ValidaCierreObraRequest} from '../../infrastructure/interfaces/gestion-obras/liquidar-materiales/liquiMateObra.request';
import {ValidaCierreObrasResponse} from '../../infrastructure/interfaces/gestion-obras/liquidar-materiales/liquiMateObra.response';
import {GrabarPartidaObrasRequest} from '../../infrastructure/interfaces/gestion-obras/liquidar-partidas/grabar.partida.obras.request';
import {GrabarPartidaObrasResponse} from '../../infrastructure/interfaces/gestion-obras/liquidar-partidas/grabar.partida.obras.response';
import {PartidasObrasRequest} from '../../infrastructure/interfaces/gestion-obras/liquidar-partidas/partidas.obras.request';
import {PartidasObrasResponse} from '../../infrastructure/interfaces/gestion-obras/liquidar-partidas/partidas.obras.response';
import {validaCierreObra} from './obras';

export const listadoPartidasObras = async (
  props: PartidasObrasRequest,
  cierreProps: ValidaCierreObraRequest,
): Promise<{
  partidas: PartidasObrasResponse;
  cierre: ValidaCierreObrasResponse;
}> => {
  try {
    const [{data: partidas}, cierre] = await Promise.all([
      genoxxApi.post<PartidasObrasResponse>(
        '/obras/listar_liquidacion_enviadas_partidas_obras',
        {
          vg_empr_codigo: props.vg_empr_codigo,
          vg_usua_perfil: props.vg_usua_perfil,
          vl_regi_codigo: props.vl_regi_codigo,
          vl_proy_codigo: props.vl_proy_codigo,
        },
      ),
      validaCierreObra(cierreProps),
    ]);
    return {
      partidas,
      cierre,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const grabarPartidaObras = async (
  props: GrabarPartidaObrasRequest,
): Promise<GrabarPartidaObrasResponse> => {
  try {
    let endpoint = 'obras/grabar_partidas_obras';

    if (props.vl_tipo_obra === 'ENERGIA') {
      endpoint = 'obras/grabar_partidas_obras_energia';
    }

    const {data} = await genoxxApi.post<GrabarPartidaObrasResponse>(endpoint, {
      vg_empr_codigo: props.vg_empr_codigo,
      vg_usua_codigo: props.vg_usua_codigo,
      vl_regi_codigo: props.vl_regi_codigo,
      vl_fecha_produccion: props.vl_fecha_produccion,
      vl_mes_obra_ind: props.vl_mes_obra_ind,
      vl_anno_obra_ind: props.vl_anno_obra_ind,
      vl_tipo_perfil: props.vl_tipo_perfil,
      vl_codi_perfil: props.vl_codi_perfil,
      vl_cod_trabajo: props.vl_cod_trabajo,
      vl_can_trabajo: props.vl_can_trabajo,
      vl_observacion: props.vl_observacion,
      vl_dificultad: props.vl_dificultad,
    });
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
