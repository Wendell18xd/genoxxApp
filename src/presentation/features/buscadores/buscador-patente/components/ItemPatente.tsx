import {Text, useTheme} from 'react-native-paper';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import {ConsultaUnidades} from '../../../../../domain/entities/ConsultaUnidades';

interface Props {
  patente: ConsultaUnidades;
  onPress?: () => void;
}

export const ItemPatente = ({patente, onPress}: Props) => {
  const {colors} = useTheme();
  const isDeBaja = patente.situacion === 'DEVP';

  return (
    <CustomCardContent
      onPress={onPress}
      mode="outlined"
      style={isDeBaja ? {borderColor: '#FF4D4D', borderWidth: 1} : {}}>
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="car-side" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {patente.nro_placa}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {patente.nom_marca}
          </Text>
        </View>

        {/* BADGE */}
        {isDeBaja && (
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, {backgroundColor: '#FF4D4D'}]}>
              <Text style={styles.badgeText}>DE BAJA</Text>
            </View>
          </View>
        )}
      </View>
    </CustomCardContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
