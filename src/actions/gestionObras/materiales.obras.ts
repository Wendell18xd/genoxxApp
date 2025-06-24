import {genoxxApi} from '../../config/api/genoxxApi';
import {
  MateLiquiRequest,
  ValidaCierreObraRequest,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.request';
import {
  MateLiquiObrasResponse,
  ValidaCierreObrasResponse,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.response';
import { validaCierreObra } from './obras';

export const listadoMaterialesObra = async (
  mateProps: MateLiquiRequest,
  cierreProps: ValidaCierreObraRequest,
): Promise<{
  materiales: MateLiquiObrasResponse;
  cierre: ValidaCierreObrasResponse;
}> => {
  try {
    const [{data: materiales}, cierre] = await Promise.all([
      genoxxApi.post<MateLiquiObrasResponse>(
        '/obras/listar_liquidacion_enviadas_obras',
        {
          vg_empr_codigo: mateProps.vl_empr_codigo,
          vl_reg_codigo: mateProps.vl_reg_codigo,
          vl_regularizar: mateProps.vl_regularizar,
        },
      ),
      validaCierreObra(cierreProps),
    ]);
    return {
      materiales,
      cierre,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};
