import {Divider, Text, useTheme} from 'react-native-paper';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import {ActividadPartida} from '../../../../../domain/entities/ActividadPartida';

interface Props {
  item: ActividadPartida;
  onPress?: () => void;
}

export const ItemActividad = ({item, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <CustomCardContent onPress={onPress} mode="outlined">
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
