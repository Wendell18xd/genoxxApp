import {createStackNavigator} from '@react-navigation/stack';
import ListarObrasMaterialesCampoScreen from '../screenListarObrasMaterialesCampo/ListarObrasMaterialesCampoScreen';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {SegmentedButtonsMatesCampo} from './SegmentedButtonsDetalleObras';

export type RecepcionMateCampoStackParam = {
  ListarObrasMaterialesCampoScreen: undefined;
  SegmentedButtonsMatesCampo: undefined;
};

const Stack = createStackNavigator<RecepcionMateCampoStackParam>();

const RecepcionMateCampoStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListarObrasMaterialesCampoScreen">
      <Stack.Screen name="ListarObrasMaterialesCampoScreen">
        {() => (
          <DrawerLayout title="Lista de Obras">
            <ListarObrasMaterialesCampoScreen />
          </DrawerLayout>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SegmentedButtonsMatesCampo"
        component={SegmentedButtonsMatesCampo}
      />
    </Stack.Navigator>
  );
};

export default RecepcionMateCampoStackNavigation;
