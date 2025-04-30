import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import OlvidarPassScreen from '../screens/auth/OlvidarPassScreen';

export type AuthStackParam = {
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
      initialRouteName="LoginScreen">
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
