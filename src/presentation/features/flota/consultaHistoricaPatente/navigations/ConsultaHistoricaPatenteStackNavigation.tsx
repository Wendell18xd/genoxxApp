import {createStackNavigator} from '@react-navigation/stack';
import { ListaConsultaHistoricaPatenteScreen } from '../screen-consulta-historica-patente/ListaConsultaHistoricaPatenteScreen';
import { BuscadorPatenteScreen } from '../../../buscadores/buscador-patente/BuscadorPatenteScreen';
import { ConsultaUnidades } from '../../../../../domain/entities/ConsultaUnidades';
import { Personal } from '../../../../../domain/entities/Personal';
import { BuscadorPersonalScreen } from '../../../buscadores/buscador-personal/BuscadorPersonalScreen';

export type ConsultaHistoricaPatenteStackParam = {
  ListaConsultaHistoricaPatenteScreen:  {patente?: ConsultaUnidades; personal?: Personal};
  BuscadorPatenteScreen: undefined;
  BuscadorPersonalScreen: undefined;
};

const Stack = createStackNavigator<ConsultaHistoricaPatenteStackParam>();

export const ConsultaHistoricaPatenteStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListaConsultaHistoricaPatenteScreen">
      <Stack.Screen name="ListaConsultaHistoricaPatenteScreen" component={ListaConsultaHistoricaPatenteScreen} />
      <Stack.Screen
        name="BuscadorPatenteScreen"
        component={BuscadorPatenteScreen}
      />
      <Stack.Screen
        name="BuscadorPersonalScreen"
        component={BuscadorPersonalScreen}
      />
    </Stack.Navigator>
  );
};
