import {StyleSheet, View } from 'react-native';
import {Divider, IconButton, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import { CustomCardContent } from '../../../../../components/ui/CustomCardContent';
import { ConsultaHistoricaPatente } from '../../../../../../domain/entities/ConsultaHistoricaPatente';

interface Props {
  consultaHistoricaPatente: ConsultaHistoricaPatente;
  onPress?: () => void;
}

export const ItemConsultaHistoricaPatente = ({consultaHistoricaPatente, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <CustomCardContent onPress={onPress} mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="car-side" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {consultaHistoricaPatente.nro_placa}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {consultaHistoricaPatente.nom_perfil}
          </Text>
        </View>

        {/* FLECHA */}
        <IconButton icon="chevron-right" size={24} iconColor={colors.primary} />
      </View>

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={{marginRight: 4}}>
            Situación:
          </Text>
          <Text variant="bodySmall">{consultaHistoricaPatente.nom_situacion}</Text>
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
    flexDirection: 'row',
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
});
