import {genoxxApi} from '../../config/api/genoxxApi';
import {
  InspeccionesAsignadasRequest,
  InspeccionesEjecutadasRequest,
} from '../../infrastructure/interfaces/prevencion/inspecciones/inspecciones.request';
import {
  InspeccionesAsignadasResponse,
  InspeccionesEjecutadasResponse,
} from '../../infrastructure/interfaces/prevencion/inspecciones/inspecciones.response';

export const GetInspeccionesAsignadas = async (
  props: InspeccionesAsignadasRequest,
): Promise<InspeccionesAsignadasResponse> => {
  try {
    const {data} = await genoxxApi.post<InspeccionesAsignadasResponse>(
      '/inspecciones/get_inspecciones_asignadas',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vl_codi_supervisor: props.vl_codi_supervisor,
        vl_fecha: props.vl_fecha,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getInspeccionesEjecutadas = async (
  props: InspeccionesEjecutadasRequest,
): Promise<InspeccionesEjecutadasResponse> => {
  try {
    const {data} = await genoxxApi.post<InspeccionesEjecutadasResponse>(
      '/inspecciones/get_inspecciones_ejecutadas',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vl_codi_supervisor: props.vl_codi_supervisor,
        vl_fecha: props.vl_fecha,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
