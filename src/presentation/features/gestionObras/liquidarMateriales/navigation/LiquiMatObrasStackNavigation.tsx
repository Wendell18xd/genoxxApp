import {createStackNavigator} from '@react-navigation/stack';
import {ListaObrasScreen} from '../screen-lista-obras/ListaObrasScreen';
import {SegmentedButtonsDetalleObras} from './SegmentedButtonsDetalleObras';

export type LiquiMatObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
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
      <Stack.Screen
        name="SegmentedButtonsDetalleObras"
        component={SegmentedButtonsDetalleObras}
      />
    </Stack.Navigator>
  );
};
