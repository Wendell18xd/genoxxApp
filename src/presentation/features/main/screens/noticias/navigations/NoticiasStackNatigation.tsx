import {createStackNavigator} from '@react-navigation/stack';
import {DetalleNoticiaScreen} from '../screens/DetalleNoticiaScreen';
import {NoticiasScreen} from '../screens/NoticiasScreen';

export type NoticiasStackParam = {
  NoticiasScreen: undefined;
  DetalleNoticiaScreen: {codNoticia: string};
};

const Stack = createStackNavigator<NoticiasStackParam>();

export const NoticiasStackNatigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="NoticiasScreen">
      <Stack.Screen name="NoticiasScreen" component={NoticiasScreen} />
      <Stack.Screen
        name="DetalleNoticiaScreen"
        component={DetalleNoticiaScreen}
      />
    </Stack.Navigator>
  );
};
