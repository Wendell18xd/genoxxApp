import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OlvidarPassScreen from '../features/auth/screens/OlvidarPassScreen';
import GetStartScreen from '../features/auth/screens/GetStartScreen';
import HomeScreen from '../features/main/screens/HomeScreen';

export type AuthStackParam = {
  GetStartScreen: undefined;
  LoginScreen: undefined;
  OlvidarPassScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginScreen">
      <Stack.Screen name="GetStartScreen" component={GetStartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OlvidarPassScreen" component={OlvidarPassScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
