import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import OlvidarPassScreen from '../features/auth/screens/OlvidarPassScreen';
import GetStartScreen from '../features/auth/screens/GetStartScreen';

export type AuthStackParam = {
  GetStartScreen: undefined;
  LoginScreen: undefined;
  OlvidarPassScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParam>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="GetStartScreen">
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
    </Stack.Navigator>
  );
};
