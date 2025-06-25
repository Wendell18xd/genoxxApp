import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {AuthStackNavigation} from './AuthStackNavigation';
import { useSessionTimeout } from '../hooks/useInactivityTimeout';

export type AppStackParam = {
  AuthStackNavigation: undefined;
};

const Stack = createStackNavigator<AppStackParam>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

const AppNavigation = () => {
  useSessionTimeout();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AuthStackNavigation">
      <Stack.Screen
        name="AuthStackNavigation"
        component={AuthStackNavigation}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
