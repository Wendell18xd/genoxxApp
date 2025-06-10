import {createStackNavigator} from '@react-navigation/stack';
import { ListaConsultaHistoricaPatenteScreen } from '../screenConsultaHistoricaPatente/ListaConsultaHistoricaPatenteScreen';
import { BuscadorPatenteScreen } from '../../../buscadores/buscadorPatente/BuscadorPatenteScreen';
import { Personal } from '../../../../../domain/entities/Personal';
import { BuscadorPersonalScreen } from '../../../buscadores/buscadorPersonal/BuscadorPersonalScreen';
import { Placa } from '../../../../../domain/entities/Placa';

export type ConsultaHistoricaPatenteStackParam = {
  ListaConsultaHistoricaPatenteScreen:  {patente?: Placa; personal?: Personal};
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
