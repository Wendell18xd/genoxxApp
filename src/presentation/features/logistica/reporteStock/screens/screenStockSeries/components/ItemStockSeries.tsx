import {Divider, Text, useTheme} from 'react-native-paper';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {CustomCardContent} from '../../../../../../components/ui/CustomCardContent';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import {formatearNumero} from '../../../../../../helper/moneyUtils';
import {StockSerie} from '../../../../../../../domain/entities/ReporteStock';

interface Props {
  serie: StockSerie;
}
export const ItemStockSeries = ({serie}: Props) => {
  const {colors} = useTheme();
  const {user} = useAuthStore();

  return (
    <CustomCardContent mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="layers" size={28} color={colors.primary} />
        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {serie.mate_nombre}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {serie.mate_codigo}
          </Text>
        </View>

        {/* STOCK CONTABLE */}
        <Text variant="bodyLarge">
          {formatearNumero({
            valor: serie.mate_cantidad,
            pais: user?.empr_pais,
          })}
        </Text>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <ItemInferior label="Serie" value={serie.mate_serie} />
      </View>
    </CustomCardContent>
  );
};

const ItemInferior = ({value, label}: {value: string; label: string}) => (
  <View style={styles.footerItem}>
    <Text variant="bodySmall" style={styles.info}>
      {label}:
    </Text>
    <Text variant="bodySmall">{value}</Text>
  </View>
);

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
  footer: {
    flexWrap: 'wrap',
    position: 'relative',
    paddingVertical: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  info: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  subtitle: {
    color: '#888',
  },
});
