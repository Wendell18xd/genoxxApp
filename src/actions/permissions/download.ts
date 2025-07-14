import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  PermissionStatus as RNPermissionStatus,
} from 'react-native-permissions';
import {Platform} from 'react-native';

export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'limited'
  | 'unavailable';

const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
  granted: 'granted',
  denied: 'denied',
  blocked: 'blocked',
  limited: 'limited',
  unavailable: 'unavailable',
};

// Función para saber si se debe pedir permiso (solo Android <= 12)
const shouldRequestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return false;

  const apiLevel =
    typeof Platform.Version === 'string'
      ? parseInt(Platform.Version, 10)
      : Platform.Version;
  return apiLevel <= 32; // Solo Android 12 y menor
};

export const requestStoragePermission = async (): Promise<PermissionStatus> => {
  if (!(await shouldRequestStoragePermission())) {
    return 'granted'; // Android 13+ no necesita permiso para Downloads
  }

  const status = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (status === 'blocked') {
    await openSettings();
    return await checkStoragePermission();
  }

  return permissionMapper[status] ?? 'unavailable';
};

export const checkStoragePermission = async (): Promise<PermissionStatus> => {
  if (!(await shouldRequestStoragePermission())) {
    return 'granted';
  }

  const status = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  return permissionMapper[status] ?? 'unavailable';
};
