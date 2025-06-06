import {StyleSheet, View} from 'react-native';
import {PartidaObras} from '../../../../../../domain/entities/PartidaObras';
import {useTheme, Divider, Text} from 'react-native-paper';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {formatearNumero} from '../../../../../helper/moneyUtils';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';

interface Props {
  partida: PartidaObras;
  onPress?: () => void;
}

export const ItemPartidaObra = ({partida, onPress}: Props) => {
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
            {partida.part_nombre}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {partida.cod_trabajo}
          </Text>
        </View>

        {/* CANTIDAD */}
        <Text variant="bodyLarge">
          {formatearNumero({
            valor: partida.can_trabajo,
            pais: user?.empr_pais,
          })}
        </Text>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <ItemInferior
          label="Fecha Producción"
          value={partida.fecha_produccion}
        />
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
