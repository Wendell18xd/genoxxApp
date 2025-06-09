import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OlvidarPassScreen from '../features/auth/screens/OlvidarPassScreen';
import GetStartScreen from '../features/auth/screens/GetStartScreen';
import CambioPassScreen from '../features/auth/screens/CambioPassScreen';
import {MainStackNavigation} from './MainStackNavigation';
import PermissionScreen from '../features/permissions/PermissionScreen';

export type AuthStackParam = {
  GetStartScreen: undefined;
  LoginScreen: undefined;
  OlvidarPassScreen: undefined;
  MainStackNavigation: undefined;
  CambioPassScreen: undefined;
  PermissionScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="GetStartScreen">
      <Stack.Screen name="GetStartScreen" component={GetStartScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OlvidarPassScreen" component={OlvidarPassScreen} />
      <Stack.Screen name="CambioPassScreen" component={CambioPassScreen} />

      <Stack.Screen
        name="MainStackNavigation"
        component={MainStackNavigation}
      />
    </Stack.Navigator>
  );
};
