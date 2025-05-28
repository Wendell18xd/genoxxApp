import {createStackNavigator} from '@react-navigation/stack';
import { ConsultaHistoricaPatente } from '../../../../../domain/entities/ConsultaHistoricaPatente';
import { ListaConsultaHistoricaPatenteScreen } from '../screen-consulta-historica-patente/ListaConsultaHistoricaPatenteScreen';
import { BuscadorConductorScreen } from '../../../buscadores/buscador-conductor/BuscadorConductorScreen';
import { BuscadorPatenteScreen } from '../../../buscadores/buscador-patente/BuscadorPatenteScreen';

export type ConsultaHistoricaPatenteStackParam = {
  ListaConsultaHistoricaPatenteScreen: undefined;
  BuscadorPatenteScreen: {consultaHistoricaPatente: ConsultaHistoricaPatente};
  BuscadorConductorScreen: {consultaHistoricaPatente: ConsultaHistoricaPatente};
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
        name="BuscadorConductorScreen"
        component={BuscadorConductorScreen}
      />
    </Stack.Navigator>
  );
};
