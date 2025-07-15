import {Divider, Text, useTheme} from 'react-native-paper';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import {OrdenATC} from '../../../../../../domain/entities/OrdenATC';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {formatearFecha} from '../../../../../helper/timeUtils';

interface Props {
  liquidacion: OrdenATC;
  onPress?: () => void;
}

export const ItemLiquiMatATC = ({liquidacion, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <CustomCardContent
      onPress={liquidacion.nro_ots ? onPress : undefined}
      mode="outlined"
      style={styles.card}
      styleContent={styles.cardContent}>
      <View style={styles.row}>
        {/* Contenido */}
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <MaterialIcons
              name="account-hard-hat"
              size={28}
              color={colors.primary}
            />
            <View style={styles.textContainer}>
              <Text variant="titleMedium" style={styles.title}>
                {liquidacion.nro_ots}
              </Text>
            </View>
          </View>

          <Divider style={{marginVertical: 8}} />

          <View style={styles.footer}>
            <ItemInferior label="Telefono" value={liquidacion.telefono} />
            <ItemInferior label="Tipo Orden" value={liquidacion.tipo_orden} />
            <ItemInferior
              label="Fecha Liq"
              value={formatearFecha(liquidacion.fecha_liquidacion)}
            />
          </View>
        </View>
      </View>
    </CustomCardContent>
  );
};
const ItemInferior = ({value, label}: {value: string; label: string}) => (
  <View style={styles.footerItem}>
    <Text variant="bodySmall" style={styles.info}>
      {label}:
    </Text>
    <Text
      variant="bodySmall"
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{flexShrink: 1}}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  colorStrip: {
    position: 'absolute',
    left: -16,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: 'red',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 10,
    paddingLeft: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
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
    flexWrap: 'nowrap',
    paddingVertical: 5,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  info: {
    fontWeight: 'bold',
    marginRight: 4,
  },
});
