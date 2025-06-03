import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {globalColors} from '../../../styles/globalStyle';
import {useObrasStore} from '../store/useObrasStore';

interface Props {
  label: string;
  value?: string | number;
  style?: StyleProp<ViewStyle>;
}

const LabelValueRow = ({label, value, style}: Props) => {
  return (
    <View style={[styles.row, style]}>
      <View style={{flex: 0.4}}>
        <Text
          variant="bodyMedium"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{color: globalColors.secondary}}>
          {label}
        </Text>
      </View>
      <View style={{flex: 0.6}}>
        <Text variant="bodyMedium" numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
      </View>
    </View>
  );
};

export const DetalleObraScreen = () => {
  const {obra} = useObrasStore();

  return (
    <ScrollView contentContainerStyle={{padding: 32}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Información de la obra
      </Text>

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Codigo Registro" value={obra?.regi_codigo} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Orden" value={obra?.nro_orden} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Orden 2" value={obra?.nro_orden2} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow
        label="Proyecto"
        value={obra?.proy_nombre}
        style={{marginBottom: 40}}
      />

      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Detalle de trabajo
      </Text>

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Tipo Obra" value={obra?.tipo_obra} />

      <Divider style={{marginVertical: 16}} />
      <LabelValueRow label="Nombre" value={obra?.nombre} />

      <Divider style={{marginVertical: 16}} />
      <LabelValueRow label="Dirección" value={obra?.direccion} />

      <Divider style={{marginVertical: 16}} />
      <LabelValueRow label="Distrito" value={obra?.distrito} />

      <Divider style={{marginVertical: 16}} />
      <LabelValueRow
        label="Supervisor"
        value={obra?.nom_supervisor}
        style={{marginBottom: 40}}
      />

      <Text variant="titleLarge" style={{fontWeight: 'bold', marginBottom: 16}}>
        Observación
      </Text>

      <Text variant="bodyMedium">{obra?.observacion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
