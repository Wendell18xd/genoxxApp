import {StyleSheet, View } from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import { CustomCardContent } from '../../../../../components/ui/CustomCardContent';
import { ConsultaHistoricaPatente } from '../../../../../../domain/entities/ConsultaHistoricaPatente';
import { formatearFecha } from '../../../../../helper/timeUtils';

interface Props {
  consultaHistoricaPersonal: ConsultaHistoricaPatente;
  onPress?: () => void;
}

export const ItemConsultaHistoricaPersonal = ({consultaHistoricaPersonal, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <CustomCardContent onPress={onPress} mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="car-side" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {consultaHistoricaPersonal.nro_placa}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
             {consultaHistoricaPersonal.cod_perfil} - {consultaHistoricaPersonal.nom_perfil}
          </Text>
        </View>
      </View>

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={{marginRight: 4, fontWeight: 'bold'}}>
            Fecha:
          </Text>
          <Text variant="bodySmall">{formatearFecha(consultaHistoricaPersonal.fecha)}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={{marginRight: 4, fontWeight: 'bold'}}>
            Situación:
          </Text>
          <Text variant="bodySmall">{consultaHistoricaPersonal.nom_situacion}</Text>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingVertical: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  gpsContainer: {
    position: 'absolute',
    right: 0,
    top: -17,
  },
});
