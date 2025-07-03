import {createStackNavigator} from '@react-navigation/stack';
import ListarObrasMaterialesCampoScreen from '../screenListarObrasMaterialesCampo/ListarObrasMaterialesCampoScreen';
import DetalleMaterialesCampoScreen from '../screenDetalleMaterialesCampo/DetalleMaterialesCampoScreen';
import DrawerLayout from '../../../main/layout/DrawerLayout';

export type RecepcionMateCampoStackParam = {
  ListarObrasMaterialesCampoScreen: undefined;
  DetalleMaterialesCampoScreen: undefined;
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
      <Stack.Screen name="DetalleMaterialesCampoScreen">
        {() => (
          <DrawerLayout title="Detalle de Obra">
            <DetalleMaterialesCampoScreen />
          </DrawerLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecepcionMateCampoStackNavigation;
