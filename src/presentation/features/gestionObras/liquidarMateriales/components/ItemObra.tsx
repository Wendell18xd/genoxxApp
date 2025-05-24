import {StyleSheet, View} from 'react-native';
import {Text, useTheme, IconButton, Divider} from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {Obra} from '../../../../../domain/entities/Obra';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';

interface Props {
  obra: Obra;
  onPress?: () => void;
}

export const ItemObra = ({obra, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <CustomCardContent onPress={onPress} mode="outlined">
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

      <Divider />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        <Text variant="bodySmall" style={{marginRight: 4}}>
          Dirección:
        </Text>
        <Text variant="bodySmall">{obra.direccion}</Text>
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
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
});
