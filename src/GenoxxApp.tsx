import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {StatusBar, useColorScheme} from 'react-native';
import AppNavigation from './presentation/navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {initApi} from './config/api/genoxxApi';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoadingScreen from './presentation/components/ui/loaders/LoadingScreen';
import PermissionChecker from './presentation/providers/PermissionChecker';
import {initDB} from './presentation/services/database/database';

const queryClient = new QueryClient();

const GenoxxApp = () => {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApi().then(() => {
      initDB()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          console.error('Error initializing database:', error);
        });
    });
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
      <Toast position="bottom" />
    </>
  );
};
export default GenoxxApp;
