import {genoxxApi} from '../../config/api/genoxxApi';
import { DocumentoOrdenesResponse } from '../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.response';
import { DocumentoOrdenesRequest } from '../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.request';

export const getDocumentoOrdenes = async (
  props: DocumentoOrdenesRequest,
): Promise<DocumentoOrdenesResponse> => {
  try {
    const {data} = await genoxxApi.post<DocumentoOrdenesResponse>(
      '/abonados/consultar_documento_ordenes_atc',
      {
        vl_empr_codigo: props.vl_empr_codigo,
        txt_nro_buscar_doc: props.txt_nro_buscar_doc,
        txt_codi_perfil: props.txt_codi_perfil,
        cbo_proy_codigo: props.cbo_proy_codigo,
        cbo_elegido: props.cbo_elegido,
        txt_fecha_liquidacion: props.txt_fecha_liquidacion,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
