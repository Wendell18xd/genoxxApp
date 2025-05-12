import DrawerLayout from '../layout/DrawerLayout';
import {useMainStore} from '../../../store/main/useMainStore';
import {View} from 'react-native';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParam} from '../../../navigations/MainStackNavigation';

export const ModuleScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {moduloSelected} = useMainStore();

  return (
    <DrawerLayout title={moduloSelected?.menu_nombre}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <PrimaryButton
          style={{paddingHorizontal: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          Ir al Inicio
        </PrimaryButton>
      </View>
    </DrawerLayout>
  );
};
