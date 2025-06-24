import NetInfo from '@react-native-community/netinfo';

export const checkInternet = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();

  // Si no hay conexión a ninguna red
  if (!state.isConnected || !state.isInternetReachable) {
    return false;
  }

  // Hacemos un "ping" real a un dominio confiable
  try {
    const response = await fetch('https://www.google.com/generate_204', {
      method: 'GET',
    });

    // Código 204 es una señal común de éxito en este endpoint especial
    return response.status === 204;
  } catch (err) {
    return false;
  }
};
