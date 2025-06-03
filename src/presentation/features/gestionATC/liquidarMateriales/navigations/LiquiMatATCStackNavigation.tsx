import {createStackNavigator} from '@react-navigation/stack';
import { LiquiMatBottomNavigator } from './LiquiMatBottomNavigator';
import LiquidarMaterialesScreen from '../screens/LiquidarMaterialesScreen';

export type LiquiMatATCStackParam = {
  LiquidarMaterialesScreen: undefined;
  DetalleBottomTabNavigation: undefined;
  LiquiMatBottomNavigator: undefined;
  DetalleLiquidarMatScreen: undefined;
};

const Stack = createStackNavigator<LiquiMatATCStackParam>();

export const LiquiMatATCStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="LiquidarMaterialesScreen">
      <Stack.Screen
        name="LiquiMatBottomNavigator"
        component={LiquiMatBottomNavigator}
      />
      <Stack.Screen name="LiquidarMaterialesScreen" component={LiquidarMaterialesScreen} />
    </Stack.Navigator>
  );
};
