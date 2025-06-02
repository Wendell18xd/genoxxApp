import {StyleSheet, View} from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import {ConsultaHistoricaPatente} from '../../../../../../domain/entities/ConsultaHistoricaPatente';
import {formatearFecha} from '../../../../../helper/timeUtils';

interface Props {
  consultaHistoricaPatente: ConsultaHistoricaPatente;
  onPress?: () => void;
}

export const ItemConsultaHistoricaPatente = ({
  consultaHistoricaPatente,
  onPress,
}: Props) => {
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
            {consultaHistoricaPatente.cod_perfil} -{' '}
            {consultaHistoricaPatente.nom_perfil}
          </Text>
        </View>
      </View>

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Fecha:
          </Text>
          <Text variant="bodySmall">
            {formatearFecha(consultaHistoricaPatente.fecha)}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Tipo de perfil:
          </Text>
          <Text variant="bodySmall">
            {consultaHistoricaPatente.tipo_perfil}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Número de documento:
          </Text>
          <Text variant="bodySmall">
            {consultaHistoricaPatente.nro_documento}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Contrata:
          </Text>
          <Text variant="bodySmall">
            {consultaHistoricaPatente.nom_contrata}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Situación:
          </Text>
          <Text variant="bodySmall">
            {consultaHistoricaPatente.nom_situacion}
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
