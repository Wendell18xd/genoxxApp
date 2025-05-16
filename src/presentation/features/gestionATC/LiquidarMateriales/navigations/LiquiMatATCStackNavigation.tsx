import {createStackNavigator} from '@react-navigation/stack';
import LiquidarMaterialesScreen from '../screens/LiquidarMaterialesScreen';
import { LiquiMatBottomNavigator } from './LiquiMatBottomNavigator';

export type LiquiMatATCStackParam = {
  LiquidarMaterialesScreen: undefined;
  DetalleBottomTabNavigation: undefined;
  LiquiMatBottomNavigator: undefined;
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
        name="LiquidarMaterialesScreen"
        component={LiquidarMaterialesScreen}
      />
      <Stack.Screen name="LiquiMatBottomNavigator" component={LiquiMatBottomNavigator} />
    </Stack.Navigator>
  );
};
