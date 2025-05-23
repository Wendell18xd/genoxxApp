import {Text} from 'react-native-paper';
import {Obra} from '../../../../../domain/entities/Obra';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

interface Props {
  obra: Obra;
  onPress?: () => void;
}

const ItemRow = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => (
  <View style={styles.row}>
    <MaterialIcons name={icon} style={{marginRight: 1}} />
    <View style={{flex: 0.3}}>
      <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
        {title}
      </Text>
    </View>
    <View style={{flex: 0.7}}>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  </View>
);

export const ItemObra = ({obra, onPress}: Props) => {
  return (
    <CustomCardContent onPress={onPress}>
      <ItemRow
        title="Cod Registro"
        value={obra.regi_codigo}
        icon="identifier"
      />
      <ItemRow
        title="Proyecto"
        value={obra.proy_nombre}
        icon="office-building"
      />
      <ItemRow
        title="Nro Orden"
        value={obra.nro_orden}
        icon="file-document-outline"
      />
      <ItemRow
        title="Cubicador"
        value={obra.nro_orden2}
        icon="cube-outline"
      />
      <ItemRow
        title="Nro Interno"
        value={obra.nro_orden3}
        icon="numeric"
      />
      <ItemRow
        title="Tipo Obra"
        value={obra.tipo_obra}
        icon="format-list-bulleted-type"
      />
      <ItemRow
        title="Nombre Obra"
        value={obra.nombre}
        icon="format-title"
      />
      <ItemRow
        title="Distrito"
        value={obra.distrito}
        icon="map-marker-radius"
      />
      <ItemRow
        title="Dirección"
        value={obra.direccion}
        icon="map-marker"
      />
    </CustomCardContent>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
    gap: 4,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
  },
});
