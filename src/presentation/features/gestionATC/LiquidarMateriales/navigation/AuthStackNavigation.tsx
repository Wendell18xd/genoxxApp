import {createStackNavigator} from '@react-navigation/stack';

import DetalleLiquidarMatScreen from '../screens/DetalleLiquidarMatScreen';
import { MainStackNavigation } from '../../../../navigations/MainStackNavigation';
import LiquidarMaterialesScreen from '../screens/LiquidarMaterialesScreen';

export type AuthStackParam = {
  LiquidarMaterialesScreen: undefined;
  DetalleLiquidarMatScreen: undefined;
  MainStackNavigation: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="LiquidarMaterialesScreen">
      <Stack.Screen name="LiquidarMaterialesScreen" component={LiquidarMaterialesScreen} />
      <Stack.Screen name="DetalleLiquidarMatScreen" component={DetalleLiquidarMatScreen} />
      <Stack.Screen
        name="MainStackNavigation"
        component={MainStackNavigation}
      />
    </Stack.Navigator>
  );
};
