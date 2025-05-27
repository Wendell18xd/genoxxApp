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
        {mate.guia_codigo && (
          <ItemInferior
            label="Guia"
            value={`${mate.guia_codigo} - ${mate.guia_numero}`}
          />
        )}

        <ItemInferior label="Sku Cliente" value={mate.mate_skucliente} />
        <ItemInferior
          label="Fecha Liquidación"
          value={mate.fecha_liquidacion}
        />
        <ItemInferior label="Liquidado por" value={mate.nom_perfil} />
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
