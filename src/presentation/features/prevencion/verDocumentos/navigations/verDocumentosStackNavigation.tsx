import {createStackNavigator} from '@react-navigation/stack';
import {BuscadorPersonalScreen} from '../../../buscadores/buscadorPersonal/BuscadorPersonalScreen';
import {VerDocumentosScreen} from '../screenVerDocumentos/VerDocumentosScreen';
import {Personal} from '../../../../../domain/entities/Personal';
// import {WebViewerDocumentoScreen} from '../screenDetalleDocumentos/WebViewerDocumentoScreen';

export type VerDocumentosStackParam = {
  VerDocumentosScreen: {personal: Personal};
  BuscadorPersonalScreen: undefined;
  // WebViewerDocumentoScreen: {url: string};
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
      {/* <Stack.Screen
        name="WebViewerDocumentoScreen"
        component={WebViewerDocumentoScreen}
      /> */}
    </Stack.Navigator>
  );
};
