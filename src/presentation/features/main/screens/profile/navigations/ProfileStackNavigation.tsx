import {createStackNavigator} from '@react-navigation/stack';
import {CambiarClaveScreen} from '../screen-cambiar-clave/CambiarClaveScreen';
import ProfileScreen from '../screen-profile/ProfileScreen';
import { AlertasScreen } from '../screen-alertas/AlertasScreen';

export type ProfileStackParam = {
  ProfileScreen: undefined;
  CambiarClaveScreen: undefined;
  AlertasScreen: undefined;
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
      <Stack.Screen name="AlertasScreen" component={AlertasScreen} />
    </Stack.Navigator>
  );
};
