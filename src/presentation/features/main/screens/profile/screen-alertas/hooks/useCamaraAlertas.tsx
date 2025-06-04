import {useFotosStore} from '../../../../../foto/store/useFotosStore';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParam} from '../../navigations/ProfileStackNavigation';
import {enviarAlerta} from '../../../../../../../actions/profile/Alertas/Alertas';

export const useCamaraAlertas = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParam>>();
  const {setInitialParams} = useFotosStore();

  const fotoMutation = useMutation({
    mutationFn: enviarAlerta,
    onSuccess: data => {
      const {datos: estado, mensaje} = data;

      // Ajusta esta condición según el tipo real que devuelve tu API
      if (Array.isArray(estado) && estado.length > 0) {
        Toast.show({
          type: 'success',
          text1: 'Alerta enviada correctamente',
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al enviar alerta',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      console.error('Error al enviar alerta:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al enviar alerta',
        text2: (error as Error).message,
      });
    },
  });

  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isSave: false,
      },
    );

    navigation.navigate('CustomCameraScreen');
  };

  return {
    fotoMutation,
    handleCamera,
  };
};
