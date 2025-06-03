import {genoxxApi} from '../../config/api/genoxxApi';
import {GrabarFotosObrasRequest} from '../../infrastructure/interfaces/obras/grabar-fotos/fotos.obras.request';
import {GrabarFotosObrasResponse} from '../../infrastructure/interfaces/obras/grabar-fotos/fotos.obras.response';

export const grabarFotosMaterialesObras = async (
  props: GrabarFotosObrasRequest,
): Promise<GrabarFotosObrasResponse> => {
  try {
    const formData = new FormData();

    // Añadir imágenes
    props.vl_fotos.forEach((imageUri, index) => {
      formData.append('vl_fotos[]', {
        uri: imageUri,
        type: 'image/jpeg',
        name: imageUri.split('/').pop(),
      } as any);

      // Añadir comentario si existe
      if (props.vl_fotos_comentarios[index]) {
        formData.append('vl_fotos_comentarios[]', props.vl_fotos_comentarios[index]);
      } else {
        formData.append('vl_fotos_comentarios[]', '');
      }
    });

    // Añadir los demás campos (puedes renombrarlos según lo que espera tu backend)
    formData.append('vg_empr_codigo', props.vg_empr_codigo);
    formData.append('vg_usua_codigo', props.vg_usua_codigo);
    formData.append('vl_regi_codigo', props.vl_regi_codigo);
    formData.append('vl_nro_guia', props.vl_nro_guia);
    formData.append('vl_tipo_archivo', props.vl_tipo_archivo);
    formData.append('vl_coord_x', props.vl_coord_x);
    formData.append('vl_coord_y', props.vl_coord_y);

    const {data} = await genoxxApi.post<GrabarFotosObrasResponse>(
      '/obras/save_fotos_obra_materiales',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
