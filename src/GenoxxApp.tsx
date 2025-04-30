import 'react-native-gesture-handler';
import {AuthStackNavigation} from './presentation/navigations/AuthStackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeContextProvider} from './presentation/context/ThemeContext';

const queryClient = new QueryClient();

const GenoxxApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthStackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
export default GenoxxApp;
