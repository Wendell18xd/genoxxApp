import {createStackNavigator} from '@react-navigation/stack';
import { ConsultaUnidades } from '../../../../../domain/entities/ConsultaUnidades';
import { ConsultaUnidadesScreen } from '../screen-consulta-unidades/hooks/consultaUnidadesScreen';
import { DetalleConsultaScreen } from '../screen-detalle-consulta/DetalleConsultaScreen';


export type ConsultaUnidadesStackParam = {
  ConsultaUnidadesScreen: undefined;
  DetalleConsultaScreen: {ConsultaUnidades: ConsultaUnidades};
};

const Stack = createStackNavigator<ConsultaUnidadesStackParam>();

export const ConsultaUnidadesStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ConsultaUnidadesScreen">
      <Stack.Screen name="ConsultaUnidadesScreen" component={ConsultaUnidadesScreen} />
      <Stack.Screen
        name="DetalleConsultaScreen"
        component={DetalleConsultaScreen}
      />
    </Stack.Navigator>
  );
};
