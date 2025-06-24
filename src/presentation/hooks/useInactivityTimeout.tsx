// hooks/useSessionTimeout.ts
import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useSessionStore} from '../store/useSessionStore';
import {ToastNativo} from '../helper/utils';
import {navigationRef} from '../navigations/navigationRef';

// const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hora
const SESSION_TIMEOUT = 10 * 1000; // 10 segundos

export const useSessionTimeout = () => {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const lastActive = useSessionStore(state => state.lastActive);
  const updateLastActive = useSessionStore(state => state.updateLastActive);
  const logout = useSessionStore(state => state.logout);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const now = Date.now();

      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // app se va al background: registramos tiempo
        updateLastActive();
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // app regresa: validamos si pasó 1h
        const inactiveTime = now - lastActive;
        if (isAuthenticated && inactiveTime > SESSION_TIMEOUT) {
          console.log('🔐 Sesión cerrada por inactividad');
          ToastNativo({
            isAlert: true,
            mensaje: 'Sesión cerrada por inactividad',
            titulo: 'Sesión cerrada',
          });
          logout({expired: true});
          navigationRef.reset({
            index: 0,
            routes: [{name: 'AuthStackNavigation'}],
          });
        }
      }

      appState.current = nextAppState;
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [isAuthenticated, lastActive, logout]);
};
