import {createStackNavigator} from '@react-navigation/stack';
import {CambiarClaveScreen} from '../screens/CambiarClaveScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type ProfileStackParam = {
  ProfileScreen: undefined;
  CambiarClaveScreen: undefined;
};

const Stack = createStackNavigator<ProfileStackParam>();

export const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CambiarClaveScreen" component={CambiarClaveScreen} />
    </Stack.Navigator>
  );
};
