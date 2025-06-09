import {Divider, Text, useTheme} from 'react-native-paper';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import {ActividadPartida} from '../../../../../domain/entities/ActividadPartida';
import {Menu} from '../../../../../types/menus';

interface Props {
  item: ActividadPartida;
  onPress?: () => void;
  drawerKey: string;
}

export const ItemActividad = ({item, drawerKey, onPress}: Props) => {
  const {colors} = useTheme();

  const tipo =
    drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA ? 'ENERGIA' : '';

  return (
    <CustomCardContent
      onPress={onPress}
      mode="outlined"
      style={
        item.part_clase !== ''
          ? {
              borderColor: '#FFE599',
              borderWidth: 1,
              backgroundColor: '#FFFBEA',
            }
          : {}
      }>
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="layers-outline" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {item.nom_para}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {item.cod_para}
          </Text>
        </View>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            U/M:
          </Text>
          <Text variant="bodySmall">{item.part_medida}</Text>
        </View>

        {tipo === 'ENERGIA' && (
          <>
            <View style={styles.footerItem}>
              <Text variant="bodySmall" style={styles.info}>
                Cantidad:
              </Text>
              <Text variant="bodySmall">{item.can_trabajo}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text variant="bodySmall" style={styles.info}>
                Codigo 2:
              </Text>
              <Text variant="bodySmall">{item.part_codigo2}</Text>
            </View>
          </>
        )}
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
  subtitle: {
    color: '#888',
  },
  footer: {
    marginTop: 8,
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
});
