import {createStackNavigator} from '@react-navigation/stack';
import { ConsultaUnidades } from '../../../../../domain/entities/ConsultaUnidades';
import { DetalleConsultaScreen } from '../screen-detalle-consulta/DetalleConsultaScreen';
import { ListaConsultaUnidadesScreen } from '../screen-consulta-unidades/ListaConsultaUnidadesScreen';


export type ConsultaUnidadesStackParam = {
  ListaConsultaUnidadesScreen: undefined;
  DetalleConsultaScreen: {consulta: ConsultaUnidades};
};

const Stack = createStackNavigator<ConsultaUnidadesStackParam>();

export const ConsultaUnidadesStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListaConsultaUnidadesScreen">
      <Stack.Screen name="ListaConsultaUnidadesScreen" component={ListaConsultaUnidadesScreen} />
      <Stack.Screen
        name="DetalleConsultaScreen"
        component={DetalleConsultaScreen}
      />
    </Stack.Navigator>
  );
};
