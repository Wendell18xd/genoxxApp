import {createStackNavigator} from '@react-navigation/stack';
import { LiquidarMaterialesPartidasScreen } from '../LiquidarMaterialesPartidasScreen';


export type LiquiMatATCStackParam = {
LiquidarMaterialesPartidasScreen: undefined,
};

const Stack = createStackNavigator<LiquiMatATCStackParam>();

export const LiquiMatATCStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="LiquidarMaterialesPartidasScreen">
      <Stack.Screen
        name="LiquidarMaterialesPartidasScreen"
        component={LiquidarMaterialesPartidasScreen}
      />
      {/* <Stack.Screen name="LiquidarMaterialesScreen" component={LiquidarMaterialesScreen} /> */}
    </Stack.Navigator>
  );
};
