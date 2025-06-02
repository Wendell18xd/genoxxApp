import {StyleSheet, View} from 'react-native';
import {Text, useTheme, IconButton} from 'react-native-paper';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import {Obra} from '../../../../domain/entities/Obra';
import {CustomCardContent} from '../../../components/ui/CustomCardContent';
import {globalColors} from '../../../styles/globalStyle';

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

      {/* <Divider /> */}

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        {/* <View style={styles.footerItem}>
          <Text variant="bodySmall" style={{marginRight: 4}}>
            Dirección:
          </Text>
          <Text variant="bodySmall">{obra.direccion}</Text>
        </View> */}

        {/* GPS */}
        {obra.coordenada_x !== '' && (
          <View style={styles.gpsContainer}>
            <IconButton
              icon="map-marker"
              iconColor={globalColors.success}
              onPress={() => {
                console.log(obra.coordenada_x, obra.coordenada_y);
              }}
            />
          </View>
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
