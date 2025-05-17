import {createStackNavigator} from '@react-navigation/stack';
import LiquidarMaterialesScreen from '../screens/LiquidarMaterialesScreen';
import DetalleLiquidarMatScreen from '../screens/DetalleLiquidarMatScreen';

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
      initialRouteName="DetalleLiquidarMatScreen">
      <Stack.Screen
        name="LiquidarMaterialesScreen"
        component={LiquidarMaterialesScreen}
      />
      <Stack.Screen name="DetalleLiquidarMatScreen" component={DetalleLiquidarMatScreen} />
    </Stack.Navigator>
  );
};
