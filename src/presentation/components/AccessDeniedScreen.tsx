import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from './ui/icons/MaterialIcons';
import PrimaryButton from './ui/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {globalColors} from '../styles/globalStyle';

interface Props {
  title: string;
  subtitle?: string;
}

export const AccessDeniedScreen = ({title, subtitle = ''}: Props) => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="alert" size={64} color={globalColors.warning} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View>
        <PrimaryButton onPress={handleGoHome} label="Aceptar" debounce />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 12,
  },
});
