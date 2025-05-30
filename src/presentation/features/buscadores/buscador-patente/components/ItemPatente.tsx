import {Divider, Text, useTheme} from 'react-native-paper';
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
  return (
    <CustomCardContent onPress={onPress} mode="outlined">
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

        {/* FLECHA */}
        {/* <IconButton icon="chevron-right" size={24} iconColor={colors.primary} /> */}
      </View>

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                patente.situacion === 'DEVP' ? '#FF4D4D' : '#4CAF50',
            }, // rojo o verde
          ]}>
          {/* <Text variant="bodySmall" style={{marginRight: 4}}>
            Estado:
          </Text> */}
          <Text style={styles.badgeText}>
            {patente.situacion === 'DEVP' ? 'DE BAJA' : 'ACTIVO'}
          </Text>
        </View>
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
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
    position: 'relative',
    paddingVertical: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  gpsContainer: {
    position: 'absolute',
    right: 0,
    top: -17,
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
