import {createStackNavigator} from '@react-navigation/stack';
import LiquidarMaterialesScreen from '../screens/LiquidarMaterialesScreen';
import { DetalleBottomTabNavigation } from '../../../../navigations/DetalleBottomTabNavigation';

export type LiquiMatATCStackParam = {
  LiquidarMaterialesScreen: undefined;
  DetalleBottomTabNavigation: undefined;
};

const Stack = createStackNavigator<LiquiMatATCStackParam>();

export const LiquiMatATCStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="DetalleBottomTabNavigation">
      <Stack.Screen
        name="LiquidarMaterialesScreen"
        component={LiquidarMaterialesScreen}
      />
      <Stack.Screen name="DetalleBottomTabNavigation" component={DetalleBottomTabNavigation} />
    </Stack.Navigator>
  );
};
