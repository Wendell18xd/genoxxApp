import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {Alert, StatusBar, useColorScheme} from 'react-native';
import AppNavigation from './presentation/navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {initApi} from './config/api/genoxxApi';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoadingScreen from './presentation/components/ui/loaders/LoadingScreen';
import PermissionChecker from './presentation/providers/PermissionChecker';
import {initDB} from './presentation/services/database/database';
import {useBackgroundSync} from './presentation/hooks/useBackgroundSync';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const queryClient = new QueryClient();

const GenoxxApp = () => {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  const [loading, setLoading] = useState(true);
  useBackgroundSync();

  const resquestPermissions = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        //todo: request for device token
        requestToken();
      } else {
        Alert.alert(
          'Permisos de notificaciones denegados',
          'Para recibir notificaciones, debes permitir el acceso a las notificaciones en la configuración de tu dispositivo.',
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const requestToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initApi().then(() => {
      initDB()
        .then(() => {
          setLoading(false);
          resquestPermissions();
        })
        .catch(error => {
          console.error('Error initializing database:', error);
        });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen state message="Iniciando App" />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        <ThemeContextProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <PermissionChecker>
              <AppNavigation />
            </PermissionChecker>
          </GestureHandlerRootView>
        </ThemeContextProvider>
      </QueryClientProvider>
      <Toast position="top" />
    </>
  );
};
export default GenoxxApp;
