import Geolocation from '@react-native-community/geolocation';
import {Location} from '../../infrastructure/interfaces/location';
import {checkInternet} from '../../presentation/helper/network';

export const getCurrentLocation = async (): Promise<Location> => {
  const conexion = await checkInternet();
  if (conexion) {
    try {
      console.log('📍 Intentando con GPS (alta precisión)...');
      return await getLocation(true, 5000); // GPS: hasta 10s
    } catch (error) {
      console.log('⚠️ Falló con GPS. Intentando con red celular/Wi-Fi...');
      try {
        return await getLocation(false, 5000); // Fallback: más rápido
      } catch (fallbackError) {
        console.log('❌ No se pudo obtener ubicación de ninguna forma.');
        return {
          latitude: 0,
          longitude: 0,
        };
      }
    }
  } else {
    return {
      latitude: 0,
      longitude: 0,
    };
  }
};

export const watchCurrentLocation = (
  locationCallBack: (location: Location) => void,
): number => {
  return Geolocation.watchPosition(
    info =>
      locationCallBack({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    error => {
      console.log(error);
      throw new Error('Cannot get Watch Position');
    },
    {
      enableHighAccuracy: true,
    },
  );
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
const getLocation = async (
  enableHighAccuracy: boolean,
  timeout: number,
): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => reject(error),
      {
        enableHighAccuracy,
        timeout,
        maximumAge: 0,
        distanceFilter: 0,
      },
    );
  });
};
