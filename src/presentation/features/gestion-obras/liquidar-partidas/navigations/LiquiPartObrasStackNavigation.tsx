import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {AccessDeniedScreen} from '../../../../components/AccessDeniedScreen';
import {useMainStore} from '../../../../store/main/useMainStore';
import {Menu} from '../../../../../types/menus';
import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {CustomCameraScreen} from '../../../foto/screens/CustomCameraScreen';
import {ListaObrasScreen} from '../../screen-lista-obras/ListaObrasScreen';
import {LiquiPartObrasScreen} from '../screen-liqui-part-obras/LiquiPartObrasScreen';
import {SegmentedButtonsDetalleObras} from '../../navigations/SegmentedButtonsDetalleObras';

export type LiquiPartObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
  CustomCameraScreen: undefined;
  LiquiPartObrasScreen: undefined;
};

const Stack = createStackNavigator<LiquiPartObrasStackParam>();

export const LiquiPartObrasStackNavigation = () => {
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

  if (
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ||
    drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA
  ) {
    if (user.trab_documento === 'ET03') {
      let message = 'liquidar materiales';

      if (drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA) {
        message = 'liquidar partidas';
      }

      return (
        <AccessDeniedScreen
          title="No tienes acceso"
          subtitle={`No estas habilitado para ${message}`}
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
        name="LiquiPartObrasScreen"
        component={LiquiPartObrasScreen}
      />
      <Stack.Screen name="CustomCameraScreen" component={CustomCameraScreen} />
    </Stack.Navigator>
  );
};
