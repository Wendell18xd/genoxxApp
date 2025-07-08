import {createStackNavigator} from '@react-navigation/stack';
import ControlOdometroScreen from '../screenControlOdometro/ControlOdometroScreen';
import { CustomCameraScreen } from '../../../foto/screens/CustomCameraScreen';

export type ControlOdometroStackParam = {
  ControlOdometroScreen: undefined;
  CustomCameraScreen: undefined;
};

const Stack = createStackNavigator<ControlOdometroStackParam>();

export const ControlOdometroStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ControlOdometroScreen">
      <Stack.Screen name="ControlOdometroScreen" component={ControlOdometroScreen} />
      <Stack.Screen name="CustomCameraScreen" component={CustomCameraScreen} />
    </Stack.Navigator>
  );
};
