import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OlvidarPassScreen from '../features/auth/screens/OlvidarPassScreen';
import GetStartScreen from '../features/auth/screens/GetStartScreen';
import CambioPassScreen from '../features/auth/screens/CambioPassScreen';

export type AuthStackParam = {
  GetStartScreen: undefined;
  LoginScreen: undefined;
  OlvidarPassScreen: undefined;
  CambioPassScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CambioPassScreen">
      <Stack.Screen
        name="GetStartScreen"
        component={GetStartScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="OlvidarPassScreen"
        component={OlvidarPassScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="CambioPassScreen"
        component={CambioPassScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
    </Stack.Navigator>
  );
};
