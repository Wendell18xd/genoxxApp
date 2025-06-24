import {StyleSheet, View} from 'react-native';
import {Divider, IconButton, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import {ConsultaInspecciones} from '../../../../../../domain/entities/ConsultaInspecciones';

interface Props {
  inspeccion: ConsultaInspecciones;
  onPress?: () => void;
}

export const ItemInspeccion = ({inspeccion, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <CustomCardContent onPress={onPress} mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="car-side" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {inspeccion.nom_situacion}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {inspeccion.placa}
          </Text>
        </View>

        {/* FLECHA */}
        <IconButton icon="chevron-right" size={24} iconColor={colors.primary} />
      </View>

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text
            variant="bodySmall"
            style={{marginRight: 4, fontWeight: 'bold'}}>
            Inspección:
          </Text>
          <Text variant="bodySmall">{inspeccion.nombre_inspeccion}</Text>
        </View>
        <View>
          <View style={styles.footerItem}>
            <Text
              variant="bodySmall"
              style={{marginRight: 4, fontWeight: 'bold'}}>
              Número de inspección:
            </Text>
            <Text variant="bodySmall">{inspeccion.numero_inspeccion}</Text>
          </View>
          <View style={styles.footerItem}>
            <Text
              variant="bodySmall"
              style={{marginRight: 4, fontWeight: 'bold'}}>
              Estado:
            </Text>
            <Text variant="bodySmall">
              {inspeccion.observado === '0' ? 'CONFORME' : 'OBSERVADO'}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text
              variant="bodySmall"
              style={{marginRight: 4, fontWeight: 'bold'}}>
              Fecha:
            </Text>
            <Text variant="bodySmall">{inspeccion.fecha}</Text>
          </View>
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
    marginTop: 4,
  },
  gpsContainer: {
    position: 'absolute',
    right: 0,
    top: -17,
  },
});
