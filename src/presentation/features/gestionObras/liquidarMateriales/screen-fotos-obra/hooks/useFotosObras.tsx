import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../../navigation/LiquiMatObrasStackNavigation';
import {useFotosStore} from '../../../../foto/store/useFotosStore';
import {Foto} from '../../../../../../domain/entities/Foto';
import {useMutation} from '@tanstack/react-query';
import {grabarFotosMaterialesObras} from '../../../../../../actions/obras/fotos.obras';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';

export const useFotosObras = () => {
  const navigation = useNavigation<NavigationProp<LiquiMatObrasStackParam>>();
  const {setInitialParams} = useFotosStore();
  const {user} = useAuthStore();
  const {obra} = useLiquiMateStore();

  //* Definir primero para que se comparta el mutacion con la pantalla de la camara
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
      mutation: fotoMutation,
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
    //* Metodos
    handleCamera,
  };
};
