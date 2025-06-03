import {genoxxApi} from '../../config/api/genoxxApi';
import {PartidasObrasRequest} from '../../infrastructure/interfaces/obras/liquidar-partidas/partidas.obras.request';
import {PartidasObrasResponse} from '../../infrastructure/interfaces/obras/liquidar-partidas/partidas.obras.response';

export const listadoPartidasObras = async (
  props: PartidasObrasRequest,
): Promise<PartidasObrasResponse> => {
  try {
    console.log(props);
    const {data} = await genoxxApi.post<PartidasObrasResponse>(
      '/obras/listar_liquidacion_enviadas_partidas_obras',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vg_usua_perfil: props.vg_usua_perfil,
        vl_regi_codigo: props.vl_regi_codigo,
        vl_proy_codigo: props.vl_proy_codigo,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
