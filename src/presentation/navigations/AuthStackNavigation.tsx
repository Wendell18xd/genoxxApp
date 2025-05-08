import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OlvidarPassScreen from '../features/auth/screens/OlvidarPassScreen';
import GetStartScreen from '../features/auth/screens/GetStartScreen';
import { MainBottomTabNavigation } from './MainBottomTabNavigation';
import CambioPassScreen from '../features/auth/screens/CambioPassScreen';

export type AuthStackParam = {
  GetStartScreen: undefined;
  LoginScreen: undefined;
  OlvidarPassScreen: undefined;
  MainBottomTabNavigation: undefined;
  CambioPassScreen: undefined;
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
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OlvidarPassScreen" component={OlvidarPassScreen} />
      <Stack.Screen name="CambioPassScreen" component={CambioPassScreen} />
      <Stack.Screen name="MainBottomTabNavigation" component={MainBottomTabNavigation} />
    </Stack.Navigator>
  );
};
