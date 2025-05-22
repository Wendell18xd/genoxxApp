import {genoxxApi} from '../../config/api/genoxxApi';
import { DocumentoOrdenesResponse } from '../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.response';
import { DocumentoOrdenesRequest } from '../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.resquest';

export const getDocumentoOrdenes = async (
  props: DocumentoOrdenesRequest,
): Promise<DocumentoOrdenesResponse> => {
  try {
    const {data} = await genoxxApi.post<DocumentoOrdenesResponse>(
      '/abonados/consultar_documento_ordenes_atc',
      {
        vl_empr_codigo: props.vl_empr_codigo,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
