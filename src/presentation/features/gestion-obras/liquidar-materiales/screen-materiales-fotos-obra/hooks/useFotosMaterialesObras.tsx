import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../../../navigations/LiquiMatObrasStackNavigation';
import {useFotosStore} from '../../../../foto/store/useFotosStore';
import {Foto} from '../../../../../../domain/entities/Foto';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  grabarFotosMaterialesObras,
  listarFotosMaterialesObras,
} from '../../../../../../actions/obras/fotos.obras';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useObrasStore} from '../../../store/useObrasStore';

export const useFotosMaterialesObras = () => {
  const navigation = useNavigation<NavigationProp<LiquiMatObrasStackParam>>();
  const {setInitialParams} = useFotosStore();
  const {user} = useAuthStore();
  const {obra} = useObrasStore();

  const {
    data: datosFotos,
    isFetching: isFetchingFotos,
    refetch: refetchFotos,
    error: errorFotos,
  } = useQuery({
    queryKey: ['fotosMaterialesObra', obra],
    queryFn: async () => {
      const {datos: fotos} = await listarFotosMaterialesObras({
        vg_empr_codigo: user?.empr_codigo || '',
        vg_usua_codigo: user?.usua_codigo || '',
        vl_tipo_archivo: 'TD05',
        vl_regi_codigo: obra?.regi_codigo || '',
      });

      return fotos;
    },
    enabled: false,
  });

  const fotoMutation = useMutation({
    mutationFn: grabarFotosMaterialesObras,
    onSuccess: data => {
      const {datos: estado, mensaje} = data;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Fotos grabadas correctamente',
        });

        //* Navego hacia atras desde la pantalla de camara
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al grabar fotos',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al grabar fotos',
        text2: error.message,
      });
    },
  });

  //* Navego hacia la pantalla de la camara y defino sus parametros iniciales
  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isComentario: true,
      isSave: true,
      onSave: async (_fotos: Foto[]) => {
        await handleSave(_fotos);
      },
    });
    navigation.navigate('CustomCameraScreen');
  };

  //* Dispara el onSave de la pantalla de la camara
  const handleSave = async (_fotos: Foto[]) => {
    await fotoMutation.mutateAsync({
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      vl_regi_codigo: obra?.regi_codigo || '',
      vl_nro_guia: '',
      vl_coord_x: '',
      vl_coord_y: '',
      vl_tipo_archivo: 'TD05',
      vl_fotos: _fotos.map(foto => foto.foto),
      vl_fotos_comentarios: _fotos.map(foto => foto.comentario),
    });
  };

  return {
    //* Propiedades
    fotoMutation,
    datosFotos,
    isFetchingFotos,
    errorFotos,

    //* Metodos
    handleCamera,
    refetchFotos,
  };
};
