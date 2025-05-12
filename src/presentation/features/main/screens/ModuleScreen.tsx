import {Text} from 'react-native-paper';
import DrawerLayout from '../layout/DrawerLayout';
import {useMainStore} from '../../../store/main/useMainStore';
import {View} from 'react-native';

export const ModuleScreen = () => {
  const {moduloSelected} = useMainStore();

  return (
    <DrawerLayout title={moduloSelected?.menu_nombre}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{moduloSelected?.menu_nombre}</Text>
      </View>
    </DrawerLayout>
  );
};
