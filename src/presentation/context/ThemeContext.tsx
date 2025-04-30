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
import {useColorScheme} from 'react-native';
import {createContext, PropsWithChildren} from 'react';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...merge(MD3LightTheme, LightTheme),
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
  fonts: {
    ...MD3DarkTheme.fonts,
    regular: {fontFamily: 'Nunito-Regular', fontWeight: '400' as '400'},
    medium: {fontFamily: 'Nunito-Medium', fontWeight: '500' as '500'},
    bold: {fontFamily: 'Nunito-Bold', fontWeight: '700' as '700'},
    heavy: {fontFamily: 'Nunito-Heavy', fontWeight: '900' as '900'},
  },
};

export const ThemeContext = createContext({
  isDark: false,
  theme: CombinedDefaultTheme,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{isDark: isDarkTheme, theme: theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
