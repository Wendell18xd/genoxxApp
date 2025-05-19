import {View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {CarruselNoticias} from './components/CarruselNoticias';

export const NoticiasScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Appbar.Header style={{backgroundColor: colors.primary}}>
        <Appbar.Content title="Noticias" color="white" />
      </Appbar.Header>

      <CarruselNoticias />
    </View>
  );
};
