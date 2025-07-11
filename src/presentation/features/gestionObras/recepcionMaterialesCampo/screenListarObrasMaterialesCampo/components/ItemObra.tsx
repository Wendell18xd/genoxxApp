import {StyleSheet, View} from 'react-native';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {Obra} from '../../../../../../domain/entities/Obra';

interface Props {
  obra: Obra;
  onPress?: () => void;
}

export const ItemObra = ({obra, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <CustomCardContent
      onPress={onPress}
      mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}
        <MaterialIcons name="cube" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {obra.nro_orden}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {obra.proy_nombre}
          </Text>
        </View>

        {/* FLECHA */}
        <IconButton icon="chevron-right" size={24} iconColor={colors.primary} />
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
  gpsContainer: {
    position: 'absolute',
    right: 0,
    top: -28,
  },
});
