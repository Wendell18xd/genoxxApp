import {useFotosStore} from '../../../../../foto/store/useFotosStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileStackParam} from '../../navigations/ProfileStackNavigation';

export const useCamaraAlertas = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParam>>();
  const {setInitialParams, fotos} = useFotosStore();

  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isSave: false,
    });
    navigation.navigate('CustomCameraScreen');
  };
  return {
    handleCamera,
    fotos,
  };
};
