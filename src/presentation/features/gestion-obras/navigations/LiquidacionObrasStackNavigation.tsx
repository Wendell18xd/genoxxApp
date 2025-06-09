import {createStackNavigator} from '@react-navigation/stack';
import {SegmentedButtonsDetalleObras} from './SegmentedButtonsDetalleObras';
import {LiquiMatObrasScreen} from '../liquidar-materiales/screen-liqui-mat-stock-obras/LiquiMatObrasScreen';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {AccessDeniedScreen} from '../../../components/AccessDeniedScreen';
import {Menu} from '../../../../types/menus';
import {useRoute} from '@react-navigation/native';
import {CustomCameraScreen} from '../../foto/screens/CustomCameraScreen';
import {ListaObrasScreen} from '../screen-lista-obras/ListaObrasScreen';
import {useMainStore} from '../../../store/main/useMainStore';
import {useEffect, useState} from 'react';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import {LiquiPartObrasScreen} from '../liquidar-partidas/screen-liqui-part-obras/LiquiPartObrasScreen';
import {BuscadorActividadPartidaScreen} from '../../buscadores/buscador-actividad-partida/BuscadorActividadPartidaScreen';

export type LiquidacionObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
  CustomCameraScreen: undefined;
  LiquiMatObrasScreen: {isRegulariza: boolean};
  LiquiPartObrasScreen: undefined;
  BuscadorActividadPartidaScreen: undefined;
};

const Stack = createStackNavigator<LiquidacionObrasStackParam>();

export const LiquidacionObrasStackNavigation = () => {
  const {drawerKey: currentDrawerKey} = useRoute().params as {
    drawerKey: string;
  };
  const {user} = useAuthStore();
  const {setDrawerKey, resetDrawerKey} = useMainStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setDrawerKey(currentDrawerKey);
    setIsReady(true);
    return () => {
      setIsReady(false);
      resetDrawerKey();
    };
  }, [currentDrawerKey]);

  if (!isReady) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return (
      <AccessDeniedScreen
        title="¡Acceso denegado!"
        subtitle="No cuentas con codigo de trabajador"
      />
    );
  }

  if (user.usua_perfil === '' || user.usua_tipo === '') {
    return (
      <AccessDeniedScreen
        title="¡Acceso denegado!"
        subtitle="No cuentas con codigo de trabajador"
      />
    );
  }

  if (currentDrawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA) {
    if (user.trab_documento === 'ET03') {
      return (
        <AccessDeniedScreen
          title="No tienes acceso"
          subtitle="No estas habilitado para liquidar materiales / partidas"
        />
      );
    }
  }

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
      <Stack.Screen
        name="LiquiMatObrasScreen"
        component={LiquiMatObrasScreen}
      />
      <Stack.Screen
        name="LiquiPartObrasScreen"
        component={LiquiPartObrasScreen}
      />
      <Stack.Screen
        name="BuscadorActividadPartidaScreen"
        component={BuscadorActividadPartidaScreen}
      />
      <Stack.Screen name="CustomCameraScreen" component={CustomCameraScreen} />
    </Stack.Navigator>
  );
};
