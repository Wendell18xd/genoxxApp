import {View, StyleSheet} from 'react-native';
import {Divider, Text, useTheme} from 'react-native-paper';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {MateLiqui} from '../../../../../../domain/entities/MateLiqui';
import {formatearNumero} from '../../../../../helper/moneyUtils';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';

interface Props {
  mate: MateLiqui;
  onPress?: () => void;
}

export const ItemMateLiqui = ({mate, onPress}: Props) => {
  const {colors} = useTheme();
  const {user} = useAuthStore();

  return (
    <CustomCardContent onPress={onPress} mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}

        <MaterialIcons name="layers" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {mate.mate_codigo}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {mate.codigo_mate}
          </Text>
        </View>

        {/* FLECHA */}
        <Text variant="bodyLarge">
          {formatearNumero({
            valor: mate.can_material,
            pais: user?.empr_pais,
          })}
        </Text>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Guia:
          </Text>
          <Text variant="bodySmall">
            {mate.guia_codigo} - {mate.guia_numero}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Sku Cliente:
          </Text>
          <Text variant="bodySmall">{mate.mate_skucliente}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Fecha Liquidación:
          </Text>
          <Text variant="bodySmall">{mate.fecha_liquidacion}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Liquidado por:
          </Text>
          <Text variant="bodySmall">{mate.nom_perfil}</Text>
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
