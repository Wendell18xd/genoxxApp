import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import PrimaryButton from '../../../components/ui/PrimaryButton';

const NoMenuAvailableScreen = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="menu-open" size={64} color="#888" />
      <Text style={styles.title}>Sin menús disponibles</Text>
      <Text style={styles.subtitle}>
        No se han encontrado opciones para mostrar en este módulo.
      </Text>
      <View>
        <PrimaryButton onPress={handleGoHome}>Volver al inicio</PrimaryButton>
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

export default NoMenuAvailableScreen;
