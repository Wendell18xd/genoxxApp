import Geolocation from '@react-native-community/geolocation';
import {Platform, Alert, Linking} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const checkIfLocationIsEnabled = (): Promise<boolean> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      () => resolve(true),
      error => {
        if (error.code === 1) {
          // PERMISSION_DENIED
          resolve(false);
        } else if (error.code === 2) {
          // POSITION_UNAVAILABLE
          resolve(false);
        } else if (error.code === 3) {
          // TIMEOUT
          resolve(false);
        } else {
          resolve(false);
        }
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 0},
    );
  });
};

export const validarGpsActivo = async (): Promise<boolean> => {
  let permission;

  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }

  const result = await check(permission);

  if (result === RESULTS.GRANTED) {
    const gpsOn = await checkIfLocationIsEnabled();

    if (!gpsOn) {
      Alert.alert(
        'Ubicación desactivada',
        'Tu GPS está apagado. Por favor, actívalo para continuar.',
        [
          {text: 'Cancelar', style: 'cancel'},
          {
            text: 'Ir a configuración',
            onPress: () => {
              if (Platform.OS === 'android') {
                Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
              } else {
                openSettings();
              }
            },
          },
        ],
      );
      return false;
    }

    return true;
  } else {
    Alert.alert(
      'Permiso denegado',
      'La app necesita permisos de ubicación para funcionar correctamente.',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Abrir configuración',
          onPress: () => openSettings(),
        },
      ],
    );
    return false;
  }
};
