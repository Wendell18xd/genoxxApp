import {useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {checkInternet} from '../../helper/network';

type Callback = () => void;

export const useNetInfoReal = (onInternetRestored: Callback) => {
  const hasInternet = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async () => {
      const isRealInternet = await checkInternet();

      // Solo si antes no había internet, y ahora sí
      if (isRealInternet && !hasInternet.current) {
        hasInternet.current = true;
        onInternetRestored();
      }

      // Si ahora no hay internet, marcarlo
      if (!isRealInternet) {
        hasInternet.current = false;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [onInternetRestored]);
};
