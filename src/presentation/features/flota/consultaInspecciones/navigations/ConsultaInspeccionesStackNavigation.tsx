import {createStackNavigator} from '@react-navigation/stack';
import { WebViewerScreen } from '../screen-detalle-inspecciones/WebViewerScreen';
import { ListaConsultaInspeccionesScreen } from '../screen-consulta-inspecciones/ListaConsultaInspeccionesScreen';

export type ConsultaInspeccionesStackParam = {
  ListaConsultaInspeccionesScreen: undefined;
  WebViewerScreen: { url: string; postData?: string;};
};

const Stack = createStackNavigator<ConsultaInspeccionesStackParam>();

export const ConsultaInspeccionesStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListaConsultaInspeccionesScreen">
      <Stack.Screen
        name="ListaConsultaInspeccionesScreen"
        component={ListaConsultaInspeccionesScreen}
      />
      <Stack.Screen
        name="WebViewerScreen"
        component={WebViewerScreen}
      />
    </Stack.Navigator>
  );
};
