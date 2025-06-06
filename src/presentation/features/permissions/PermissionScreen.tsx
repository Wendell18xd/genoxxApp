import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {usePermissionStore} from '../../store/permissions/usePermissionStore';
import PrimaryButton from '../../components/ui/PrimaryButton';
import {Text} from 'react-native-paper';

const PermissionScreen = () => {
  const {requestLocationPermission} = usePermissionStore();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/lotties/location-permission.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text variant="headlineMedium" style={styles.title}>
        ¡Necesitamos tu ubicación!
      </Text>

      <Text style={styles.subtitle}>
        Para brindarte una mejor experiencia, activa los permisos de
        localización.
      </Text>

      <View>
        <PrimaryButton
          onPress={requestLocationPermission}
          label="Habilitar Localización"
        />
      </View>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
});
