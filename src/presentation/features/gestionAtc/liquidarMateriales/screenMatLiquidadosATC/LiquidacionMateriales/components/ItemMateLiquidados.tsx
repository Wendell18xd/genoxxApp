import { Divider, Text, useTheme } from 'react-native-paper';
import { LiquidacionATC } from '../../../../../../../domain/entities/LiquidacionATC';
import { useAuthStore } from '../../../../../../store/auth/useAuthStore';
import { CustomCardContent } from '../../../../../../components/ui/CustomCardContent';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import { formatearNumero } from '../../../../../../helper/moneyUtils';

interface Props {
    liqui: LiquidacionATC;
}

export const ItemMateLiquidados = ({liqui}:Props) => {
    const {colors} = useTheme();
    const {user} = useAuthStore();
  return (
    <CustomCardContent>
        <View style = {styles.container}>
            {/* ICONO */}
            <MaterialIcons name="layers" size={18} color={colors.primary} />

            {/* CONTENIDO PRINCIPAL */}
            <View style={styles.content}>
                <Text variant="titleMedium" style={styles.title}>
                    {liqui.mate_codigo}
                </Text>
                <Text variant="bodySmall" style={styles.subtitle}>
                    {liqui.mate_nombre}
                </Text>
            </View>

            {/* CANTIDAD */}
            <Text variant="bodyLarge">
                {formatearNumero({
                    valor: liqui.mate_cantidad,
                    pais: user?.empr_pais,
                })}
            </Text>
        </View>

        <Divider style={{marginVertical: 8}} />

        {/* ETIQUETA INFERIOR */}

        <ItemInferior label= "Sku Cliente" value={liqui.mate_skucliente}/>
        <ItemInferior label= "Nro Serie" value={liqui.mate_serie}/>

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
