import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
// import {useColorScheme} from 'react-native';
import {createContext, PropsWithChildren} from 'react';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import {IconProps} from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import {navigationRef} from '../navigations/navigationRef';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...merge(MD3LightTheme, LightTheme),
  colors: {
    ...merge(MD3LightTheme.colors, LightTheme.colors),
    primary: '#043767', // tu color principal claro
    secondary: '#0090D7', // tu color secundario claro
  },
  fonts: {
    ...MD3LightTheme.fonts,
    regular: {fontFamily: 'Nunito-Regular', fontWeight: '400' as '400'},
    medium: {fontFamily: 'Nunito-Medium', fontWeight: '500' as '500'},
    bold: {fontFamily: 'Nunito-Bold', fontWeight: '700' as '700'},
    heavy: {fontFamily: 'Nunito-Heavy', fontWeight: '900' as '900'},
  },
};

const CombinedDarkTheme = {
  ...merge(MD3DarkTheme, DarkTheme),
  colors: {
    ...merge(MD3DarkTheme.colors, DarkTheme.colors),
    primary: '#043767', // tu color principal oscuro
    secondary: '#0090D7',
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    regular: {fontFamily: 'Nunito-Regular', fontWeight: '400' as '400'},
    medium: {fontFamily: 'Nunito-Medium', fontWeight: '500' as '500'},
    bold: {fontFamily: 'Nunito-Bold', fontWeight: '700' as '700'},
    heavy: {fontFamily: 'Nunito-Heavy', fontWeight: '900' as '900'},
  },
};

const RenderIcon = (props: IconProps) => <MaterialIcons {...props} />;

export const ThemeContext = createContext({
  isDark: false,
  theme: CombinedDefaultTheme,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  // const colorScheme = useColorScheme();
  // const isDarkTheme = colorScheme === 'dark';
  const isDarkTheme = false; // Forcing light theme
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: props => RenderIcon(props),
      }}>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <ThemeContext.Provider value={{isDark: isDarkTheme, theme: theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
