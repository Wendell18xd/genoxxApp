import {createStackNavigator} from '@react-navigation/stack';
import {DetalleNoticiaScreen} from '../detalle-noticia-screen/DetalleNoticiaScreen';
import {NoticiasScreen} from '../noticias-screen/NoticiasScreen';
import {Noticia} from '../../../../../../domain/entities/Noticia';

export type NoticiasStackParam = {
  NoticiasScreen: undefined;
  DetalleNoticiaScreen: {noticia: Noticia};
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
