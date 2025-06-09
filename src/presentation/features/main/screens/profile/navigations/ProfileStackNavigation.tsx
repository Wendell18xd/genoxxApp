import {createStackNavigator} from '@react-navigation/stack';
import {CambiarClaveScreen} from '../screen-cambiar-clave/CambiarClaveScreen';
import ProfileScreen from '../screen-profile/ProfileScreen';
import { AlertasScreen } from '../screen-alertas/AlertasScreen';
import { CustomCameraScreen } from '../../../../foto/screens/CustomCameraScreen';

export type ProfileStackParam = {
  ProfileScreen: undefined;
  CambiarClaveScreen: undefined;
  AlertasScreen: undefined;
  CustomCameraScreen: undefined;
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
      <Stack.Screen name="CustomCameraScreen" component={CustomCameraScreen} />
    </Stack.Navigator>
  );
};
