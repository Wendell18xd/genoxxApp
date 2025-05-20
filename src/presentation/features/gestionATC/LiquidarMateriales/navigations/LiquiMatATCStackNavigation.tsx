import {createStackNavigator} from '@react-navigation/stack';
import { LiquiMatBottomNavigator } from './LiquiMatBottomNavigator';

export type LiquiMatATCStackParam = {
  LiquidarMaterialesScreen: undefined;
  DetalleBottomTabNavigation: undefined;
  LiquiMatBottomNavigator: undefined;
  DetalleLiquidarMatScreen: undefined;
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
      initialRouteName="LiquiMatBottomNavigator">
      <Stack.Screen
        name="LiquiMatBottomNavigator"
        component={LiquiMatBottomNavigator}
      />
      <Stack.Screen name="DetalleLiquidarMatScreen" component={LiquiMatBottomNavigator} />
    </Stack.Navigator>
  );
};
