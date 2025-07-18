import {createStackNavigator} from '@react-navigation/stack';
import {BuscadorPersonalScreen} from '../../../buscadores/buscadorPersonal/BuscadorPersonalScreen';
import {VerDocumentosScreen} from '../screenVerDocumentos/VerDocumentosScreen';
import {Personal} from '../../../../../domain/entities/Personal';

export type VerDocumentosStackParam = {
  VerDocumentosScreen: {personal: Personal};
  BuscadorPersonalScreen: undefined;
};

const Stack = createStackNavigator<VerDocumentosStackParam>();

export const VerDocumentosStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="VerDocumentosScreen">
      <Stack.Screen
        name="VerDocumentosScreen"
        component={VerDocumentosScreen}
      />
      <Stack.Screen
        name="BuscadorPersonalScreen"
        component={BuscadorPersonalScreen}
      />
    </Stack.Navigator>
  );
};
