import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {useMainStore} from '../../../store/main/useMainStore';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import {AccessDeniedScreen} from '../../../components/AccessDeniedScreen';
import {ConsultaEjecucionScreen} from '../screenConsultarEjecucion/ConsultaEjecucionScreen';
import {SegmentedButtonsDetalleConsulta} from './SegmentedButtonsDetalleConsulta';
import {ConsultaEjecucion} from '../../../../domain/entities/ConsultaEjecucion';
import {DetalleConsultaEjecucionScreen} from '../screenConsultarEjecucion/screenDetalleConsulta/DetalleConsultaEjecucionScreen';
export type EjecucionObrasStackParam = {
  SegmentedButtonsConsultarEjecucion: undefined;
  ConsultaEjecucionScreen: undefined;
  SegmentedButtonsDetalleConsulta: {
    SegmentedButtonsDetalleConsulta: ConsultaEjecucion;
  };
  DetalleConsultaEjecucionScreen: undefined;
};

const Stack = createStackNavigator<EjecucionObrasStackParam>();

export const EjecucionObrasStackNavigation = () => {
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

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ConsultaEjecucionScreen">
      <Stack.Screen
        name="ConsultaEjecucionScreen"
        component={ConsultaEjecucionScreen}
      />
      <Stack.Screen
        name="SegmentedButtonsDetalleConsulta"
        component={SegmentedButtonsDetalleConsulta}
      />
      <Stack.Screen
        name="DetalleConsultaEjecucionScreen"
        component={DetalleConsultaEjecucionScreen}
      />
    </Stack.Navigator>
  );
};
