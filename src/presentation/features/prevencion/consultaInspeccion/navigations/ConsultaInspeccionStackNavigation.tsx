import {createStackNavigator} from '@react-navigation/stack';
import ListaConsultaInspeccionScreen from '../screenConsultaInspeccion/ListaConsultaInspeccionScreen';
import { WebViewerScreen } from '../screenDetalleInspeccion/WebViewerScreen';

export type ConsultaInspeccionStackParam = {
  ListaConsultaInspeccionScreen: undefined;
  WebViewerScreen: { url: string; postData?: string;};
};

const Stack = createStackNavigator<ConsultaInspeccionStackParam>();

export const ConsultaInspeccionStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListaConsultaInspeccionScreen">
      <Stack.Screen
        name="ListaConsultaInspeccionScreen"
        component={ListaConsultaInspeccionScreen}
      />
      <Stack.Screen
        name="WebViewerScreen"
        component={WebViewerScreen}
      />
    </Stack.Navigator>
  );
};
