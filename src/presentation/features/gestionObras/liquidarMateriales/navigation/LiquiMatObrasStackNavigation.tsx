import {createStackNavigator} from '@react-navigation/stack';
import {ListaObrasScreen} from '../screen-lista-obras/ListaObrasScreen';
import {SegmentedButtonsDetalleObras} from './SegmentedButtonsDetalleObras';
import {LiquiMatObrasScreen} from '../screen-liqui-mat-stock-obras/LiquiMatObrasScreen';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {AccessDeniedScreen} from '../../../../components/AccessDeniedScreen';
import {useMainStore} from '../../../../store/main/useMainStore';
import {Menu} from '../../../../../types/menus';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import { CustomCameraScreen } from '../../../foto/screens/CustomCameraScreen';

export type LiquiMatObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
  CustomCameraScreen: undefined;
  LiquiMatObrasScreen: {isRegulariza: boolean};
};

const Stack = createStackNavigator<LiquiMatObrasStackParam>();

export const LiquiMatObrasStackNavigation = () => {
  const {user} = useAuthStore();
  const {setDrawerKey, resetDrawerKey} = useMainStore();
  const {drawerKey} = useRoute().params as {drawerKey: string};
  const [isReady, setIsReady] = useState(false);

  //* SETEO EL DRAWER KEY
  useEffect(() => {
    //* Lo seteamos una sola vez
    setDrawerKey(drawerKey);
    setIsReady(true); //* Ahora sí puede renderizar
    return () => resetDrawerKey();
  }, [drawerKey]);

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

  if (drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA) {
    if (user.trab_documento === 'ET03') {
      return (
        <AccessDeniedScreen
          title="No tienes acceso"
          subtitle="No estas habilitado para liquidar materiales"
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
        name="CustomCameraScreen"
        component={CustomCameraScreen}
      />
    </Stack.Navigator>
  );
};
