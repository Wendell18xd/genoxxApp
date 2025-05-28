import {genoxxApi} from '../../config/api/genoxxApi';
import {
  MateLiquiRequest,
  ValidaCierreObraRequest,
} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/liquiMateObra.request';
import {
  MateLiquiObrasResponse,
  ValidaCierreObrasResponse,
} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/liquiMateObra.response';

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

    console.log(materiales, cierre);

    return {
      materiales,
      cierre,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export const validaCierreObra = async (
  props: ValidaCierreObraRequest,
): Promise<ValidaCierreObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ValidaCierreObrasResponse>(
      '/obras/get_valida_cierre_obra',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        vl_nro_orden: props.vl_nro_orden,
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
