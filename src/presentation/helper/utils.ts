import {Alert, Platform, ToastAndroid} from 'react-native';

export const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  return regex.test(password);
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function ToastNativo(mensaje: string, titulo: string = 'Info') {
  if (Platform.OS === 'android') {
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert(titulo, mensaje);
  } else {
    console.log('Toast:', mensaje);
  }
}

export function mostrarSiNoCero(valor: number | string): string {
  if (valor === 0 || valor === '0') {
    return '';
  }
  return valor.toString();
}
