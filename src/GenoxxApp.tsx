import 'react-native-gesture-handler';
import {AuthStackNavigation} from './presentation/navigations/AuthStackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {StatusBar, useColorScheme} from 'react-native';

const queryClient = new QueryClient();

const GenoxxApp = () => {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />
      <ThemeContextProvider>
        <AuthStackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
export default GenoxxApp;
