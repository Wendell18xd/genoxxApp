import { useFotosStore } from '../../../../../foto/store/useFotosStore';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { grabarFotosMaterialesObras } from '../../../../../../../actions/obras/fotos.obras';
import { ProfileStackParam } from '../../navigations/ProfileStackNavigation';

export const useCamaraAlertas = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParam>>();
  const { setInitialParams } = useFotosStore();

  const fotoMutation = useMutation({
    mutationFn: grabarFotosMaterialesObras,
    onSuccess: data => {
      const { datos: estado, mensaje } = data;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Fotos grabadas correctamente',
        });

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
      console.error('Error al grabar fotos:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al grabar fotos',
        text2: error.message,
      });
    },
  });

  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isSave: false,
    });

    navigation.navigate('CustomCameraScreen');
  };

  

  return {
    fotoMutation,
    handleCamera,
  };
};
