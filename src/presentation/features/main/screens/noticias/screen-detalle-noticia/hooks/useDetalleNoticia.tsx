// hooks/useDetalleNoticia.ts
import {useMutation, useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {listadoArchivosNoticia} from '../../../../../../../actions/main/main';
import {
  Noticia,
  RegistroDesdeNoticia,
} from '../../../../../../../domain/entities/Noticia';
import {useNoticiasStore} from '../../store/useNoticiasStore';

interface Props {
  noticia: Noticia;
}

export const useDetalleNoticia = ({noticia}: Props) => {
  const {user} = useAuthStore();
  const {setRefresh} = useNoticiasStore();
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['archivosNoticia', noticia.cont_correlativo],
    queryFn: () =>
      listadoArchivosNoticia({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_cont_correlativo: noticia.cont_correlativo,
        vl_is_visto: noticia.is_visto,
        vl_registro_desde: RegistroDesdeNoticia.App,
      }),
  });

  const mutation = useMutation({
    mutationFn: listadoArchivosNoticia,
    onSuccess: _ => {
      Toast.show({
        type: 'success',
        text1: 'Noticia marcada como leída',
        text2: 'La noticia se ha marcado como leída correctamente',
      });
      setRefresh(true);
      navigation.goBack();
    },
    onError: error => {
      Toast.show({type: 'error', text1: error.message});
    },
  });

  const handleMarcarLeido = () => {
    mutation.mutate({
      vl_empr_codigo: user?.empr_codigo || '',
      vl_trab_codigo: user?.usua_perfil || '',
      vl_cont_correlativo: noticia.cont_correlativo,
      vl_is_visto: 1,
      vl_registro_desde: RegistroDesdeNoticia.App,
    });
  };

  return {
    //* Propiedades
    detalle: query.data,
    isLoading: query.isLoading,

    //* Metodos
    handleMarcarLeido,
    mutation,
  };
};
