import {createStackNavigator} from '@react-navigation/stack';
import {CustomCameraScreen} from '../../../../../foto/screens/CustomCameraScreen';
import { AlertasScreen } from '../AlertasScreen';
export type AlertasStackParam = {
  AlertasScreen: undefined;
  CustomCameraScreen: undefined;
};

const Stack = createStackNavigator<AlertasStackParam>();

export const AlertasStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AlertasScreen">
      <Stack.Screen name="AlertasScreen" component={AlertasScreen} />
      <Stack.Screen
        name="CustomCameraScreen"
        component={CustomCameraScreen}
      />
    </Stack.Navigator>
  );
};
