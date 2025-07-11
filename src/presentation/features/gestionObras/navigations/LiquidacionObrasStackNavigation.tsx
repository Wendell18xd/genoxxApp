import {createStackNavigator} from '@react-navigation/stack';
import {SegmentedButtonsDetalleObras} from './SegmentedButtonsDetalleObras';
import {LiquiMatObrasScreen} from '../liquidarMateriales/screenLiquiMatStockObras/LiquiMatObrasScreen';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {AccessDeniedScreen} from '../../../components/AccessDeniedScreen';
import {Menu} from '../../../../types/menus';
import {useRoute} from '@react-navigation/native';
import {CustomCameraScreen} from '../../foto/screens/CustomCameraScreen';
import {ListaObrasScreen} from '../screenListaObras/ListaObrasScreen';
import {useMainStore} from '../../../store/main/useMainStore';
import {useEffect, useState} from 'react';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import {LiquiPartObrasScreen} from '../liquidarPartidas/screenLiquiPartObras/LiquiPartObrasScreen';
import {BuscadorActividadPartidaScreen} from '../../buscadores/buscadorActividadPartida/BuscadorActividadPartidaScreen';
import {SegmentedButtonsEjecucionObras} from '../ejecucionObras/navigations/SegmentedButtonsEjecucionObras';
import {ActividaSinObra} from '../ejecucionObras/ejecucionSinObra/screen-actividad/ActividaSinObra';

export type LiquidacionObrasStackParam = {
  ListaObrasScreen: undefined;
  SegmentedButtonsDetalleObras: undefined;
  SegmentedButtonsEjecucionObras: undefined;
  CustomCameraScreen: undefined;
  LiquiMatObrasScreen: {isRegulariza: boolean};
  LiquiPartObrasScreen: undefined;
  BuscadorActividadPartidaScreen: undefined;
  ActividaSinObra: undefined;
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
        name="SegmentedButtonsEjecucionObras"
        component={SegmentedButtonsEjecucionObras}
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
      <Stack.Screen name="ActividaSinObra" component={ActividaSinObra} />
    </Stack.Navigator>
  );
};
