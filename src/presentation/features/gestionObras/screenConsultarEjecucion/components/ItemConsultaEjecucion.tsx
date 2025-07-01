import {Divider, Text, useTheme} from 'react-native-paper';
import {ConsultaEjecucion} from '../../../../../domain/entities/ConsultaEjecucion';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import React from 'react';

interface Props {
  consulta: ConsultaEjecucion;
  onPress?: () => void;
}
export const ItemConsultaEjecucion = ({consulta, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <CustomCardContent onPress={onPress} mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="account-hard-hat" size={28} color={colors.primary} />
        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {consulta.nom_actividad}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {consulta.fecha}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {consulta.hora}
          </Text>
        </View>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta Inferior */}
      <View style={styles.footer}>
        <ItemInferiorNumero label="Nro Orden" value={consulta.nro_orden} />
        <ItemInferiorNumero label="Nro Orden2" value={consulta.nro_orden2} />
        <ItemInferior label="Comentario" value={consulta.obse_ejecutado} />
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

const ItemInferiorNumero = ({value, label}: {value: number; label: string}) => (
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
