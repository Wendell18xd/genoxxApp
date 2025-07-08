import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {globalColors} from '../../../../styles/globalStyle';
import {Divider, Text} from 'react-native-paper';
import CustomScrollView from '../../../../components/ui/CustomScrollView';
import {useConsultaEjecucionStore} from '../../store/useConsultaEjecucionStore';

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
        <Text variant="bodyMedium">{value}</Text>
      </View>
    </View>
  );
};

export const DetalleConsultaEjecucionScreen = () => {
  const {consulta} = useConsultaEjecucionStore();
  return (
    <CustomScrollView contentContainerStyle={{padding: 32}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Detalle
      </Text>

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Orden" value={consulta?.nro_orden} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Orden2" value={consulta?.nro_orden2} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Fecha" value={consulta?.hora} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Actividad" value={consulta?.nom_actividad} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Comentario" value={consulta?.obse_ejecutado} />
    </CustomScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
