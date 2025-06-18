import { Divider, Text, useTheme } from 'react-native-paper';
import { useAuthStore } from '../../../../../../store/auth/useAuthStore';
import { CustomCardContent } from '../../../../../../components/ui/CustomCardContent';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import { formatearNumero } from '../../../../../../helper/moneyUtils';

interface Props {
    series: StockSeries;
}

export const ItemStockSeries = (series) => {
    const {colors} = useTheme();
    const {user} = useAuthStore();
  return (
    <CustomCardContent mode="outlined">
        <View style= {styles.container}>
            {/* ICONO */}
            <MaterialIcons name="layers" size={28} color={colors.primary}/>

            {/* CONTENIDO PRINCIPAL */}

            <View style={styles.content}>
                <Text variant="titleMedium" style={styles.title}>
                    {series. }
                </Text>
                <Text variant="bodySmall" style={styles.subtitle}>
                    {series. }
                </Text>
            </View>

            {/* CANTIDAD */}
            <Text>
                {formatearNumero({
                    valor: series. ,
                    pais: user?.empr_codigo,
                })}
            </Text>
        </View>

        <Divider style={{marginVertical: 8}}/>

        {/* Etiqueta inferior */}
        <View style={styles.footer}>
            <ItemInferior label="Cod Material" value={series.}/>
            <ItemInferior label="Descripción" value={series. } />
            <ItemInferior label="Serie" value= {series. }/>
        </View>
    </CustomCardContent>
  )
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