import {createStackNavigator} from '@react-navigation/stack';
import InspeccionesPendientes from '../screenInspeccionesPendientes/InspeccionesPendientes';

export type InspeccionesStackParam = {
  InspeccionesPendientes: undefined;
};

const Stack = createStackNavigator<InspeccionesStackParam>();

export const InspeccionesStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="InspeccionesPendientes">
      <Stack.Screen
        name="InspeccionesPendientes"
        component={InspeccionesPendientes}
      />
    </Stack.Navigator>
  );
};
