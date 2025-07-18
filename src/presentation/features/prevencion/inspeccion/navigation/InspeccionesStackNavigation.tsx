import {createStackNavigator} from '@react-navigation/stack';
import InspeccionesPendientes from '../screenInspeccionesPendientes/InspeccionesPendientes';
import FirmaScreen from '../../../firma/screen/FirmaScreen';
import {BarcodeScannerScreen} from '../../../barcodeScanner/screen/BarcodeScannerScreen';

export type InspeccionesStackParam = {
  InspeccionesPendientes: undefined;
  FirmaScreen: undefined;
  BarcodeScannerScreen: undefined;
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
      <Stack.Screen name="FirmaScreen" component={FirmaScreen} />
      <Stack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      />
    </Stack.Navigator>
  );
};
