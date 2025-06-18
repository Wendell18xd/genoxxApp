import {Divider, Text, useTheme} from 'react-native-paper';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {CustomCardContent} from '../../../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import { formatearNumero } from '../../../../../../helper/moneyUtils';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ReporteStock } from '../../../../../../../domain/entities/ReporteStock';

interface Props {
  detalle: ReporteStock;
}
export const ItemDetalleStock = ({detalle}: Props) => {
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
            {detalle.mate_nombre}
           </Text>
           <Text variant="bodySmall" style={styles.subtitle}>
            {detalle.mate_codigo}
           </Text>
        </View>

        {/* STOCK CONTABLE */}
        <Text variant="bodyLarge">
            {formatearNumero({
                valor: detalle.alma_stock,
                pais: user?.empr_pais,
            })}
        </Text>
      </View>

      <Divider style={{marginVertical: 8}}/>

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <ItemInferior label= "Umed" value= {detalle.mate_medida}/>
      </View>
    </CustomCardContent>
  );
};

const ItemInferior = ({value, label}: {value: string, label: string}) => (
    <View style={styles.footerItem}>
        <Text variant="bodySmall" style={styles.info}>{label}:</Text>
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
