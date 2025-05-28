import {createStackNavigator} from '@react-navigation/stack';
import {ListaObrasScreen} from '../screen-lista-obras/ListaObrasScreen';
import {SegmentedButtonsDetalleObras} from './SegmentedButtonsDetalleObras';
import {LiquiMatObrasScreen} from '../screen-liqui-mat-stock-obras/LiquiMatObrasScreen';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {AccessDeniedScreen} from '../../../../components/AccessDeniedScreen';
import {useMainStore} from '../../../../store/main/useMainStore';
import {Menu} from '../../../../../types/menus';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

export type LiquiMatObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
  LiquiMatObrasScreen: {isRegulariza: boolean};
};

const Stack = createStackNavigator<LiquiMatObrasStackParam>();

export const LiquiMatObrasStackNavigation = () => {
  const {user} = useAuthStore();
  const {setDrawerKey, resetDrawerKey, drawerKey: storeKey} = useMainStore();
  const {drawerKey} = useRoute().params as {drawerKey: string};

  //* SETEO EL DRAWER KEY
  if (storeKey !== drawerKey) {
    setDrawerKey(drawerKey);
  }

  //* RESET DEL DRAWER KEY
  useEffect(() => {
    return () => resetDrawerKey();
  }, []);

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
    </Stack.Navigator>
  );
};
