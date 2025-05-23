import {createStackNavigator} from '@react-navigation/stack';
import {ListaObrasScreen} from '../screen-lista-obras/ListaObrasScreen';
import {DetalleObraScreen} from '../screen-detalle-obra/DetalleObraScreen';

export type LiquiMatObrasStackParam = {
  ListaObrasScreen: undefined;
  DetalleObraScreen: undefined;
};

const Stack = createStackNavigator<LiquiMatObrasStackParam>();

export const LiquiMatObrasStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ListaObrasScreen">
      <Stack.Screen name="ListaObrasScreen" component={ListaObrasScreen} />
      <Stack.Screen name="DetalleObraScreen" component={DetalleObraScreen} />
    </Stack.Navigator>
  );
};
