import {genoxxApi} from '../../config/api/genoxxApi';
import {LiquidacionATCRequest} from '../../infrastructure/interfaces/gestionATC/liquidacion/liquidacionATC.request';
import {LiquidacionATCResponse} from '../../infrastructure/interfaces/gestionATC/liquidacion/liquidacionATC.response';

export const getLiquidacionesATC = async (
  props: LiquidacionATCRequest,
): Promise<LiquidacionATCResponse> => {
  try {
    const {data} = await genoxxApi.post<LiquidacionATCResponse>(
      '/abonados/listar_liquidacion_enviadas_ATC',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_nro_ots: props.txt_nro_ost,
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
