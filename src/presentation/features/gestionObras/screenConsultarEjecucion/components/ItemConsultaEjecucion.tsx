import {StyleSheet, View} from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import {ConsultaEjecucion} from '../../../../../domain/entities/ConsultaEjecucion';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

interface Props {
  consulta: ConsultaEjecucion;
  onPress?: () => void;
}

export const ItemConsultaEjecucion = ({consulta, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <CustomCardContent
      onPress={consulta.nro_orden ? onPress : undefined}
      mode="outlined"
      style={styles.card}
      styleContent={styles.cardContent}>
      <View style={styles.row}>
        {/* Franja de color alineada al borde izquierdo */}
        <View style={[styles.colorStrip, {backgroundColor: consulta.color}]} />

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
                {consulta.nom_actividad}
              </Text>
              <View>
                <Text variant="bodySmall" style={styles.subtitle}>
                  {consulta.fecha + ' - ' + consulta.hora}
                </Text>
              </View>
            </View>
          </View>

          <Divider style={{marginVertical: 8}} />

          <View style={styles.footer}>
            <ItemInferior label="Nro Orden" value={consulta.nro_orden} />
            <ItemInferior label="Nro Orden2" value={consulta.nro_orden2} />
            <ItemInferior label="Comentario" value={consulta.obse_ejecutado} />
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
    <Text variant="bodySmall">{value}</Text>
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
