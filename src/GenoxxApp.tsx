import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {StatusBar, useColorScheme} from 'react-native';
import AppNavigation from './presentation/navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import {initApi} from './config/api/genoxxApi';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';

const queryClient = new QueryClient();

const GenoxxApp = () => {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    initApi();
  }, []);

  // Despues revisar afecta a la posision del dropdown
  /* useEffect(() => {
    changeNavigationBarColor('transparent', true, false);
  }, []); */

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
            <AppNavigation />
          </GestureHandlerRootView>
        </ThemeContextProvider>
      </QueryClientProvider>
      <Toast position="bottom" />
    </>
  );
};
export default GenoxxApp;
