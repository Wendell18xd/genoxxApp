import {genoxxApi} from '../../config/api/genoxxApi';
import {VerDocumentosRequest} from '../../infrastructure/interfaces/prevencion/verDocumentos/verDocumentos.request';
import {VerDocumentosResponse} from '../../infrastructure/interfaces/prevencion/verDocumentos/verDocumentos.response';

export const getListarDocumentos = async (
  props: VerDocumentosRequest,
): Promise<VerDocumentosResponse> => {
  try {
    console.log('getListarDocumentos', props);
    const {data} = await genoxxApi.post<VerDocumentosResponse>(
      '/inspecciones/listar_documentos_prevencion_trabajador',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        txt_cod_trabajador: props.txt_cod_trabajador,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
