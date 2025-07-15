import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { globalColors } from '../../../../styles/globalStyle';
import { useLiquiMatATCStore } from '../../store/useLiquiMatATCStore';
import CustomScrollView from '../../../../components/ui/CustomScrollView';
import { formatearFecha } from '../../../../helper/timeUtils';

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
  const {LiquidacionMat} = useLiquiMatATCStore();
  return (
    <CustomScrollView contentContainerStyle={{padding: 32}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Detalle
      </Text>

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Proyecto" value={LiquidacionMat?.proy_codigo} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Unidad de Negocio" value={LiquidacionMat?.gpro_codigo} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Petición" value={LiquidacionMat?.nro_ots} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nro Solicitud" value={LiquidacionMat?.nro_solicitud} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Fecha Liquidación" value={formatearFecha(LiquidacionMat?.fecha_liquidacion)} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Hora Liquidación" value={LiquidacionMat?.hora_liquidacion} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Fecha de Emisión" value={formatearFecha(LiquidacionMat?.fecha_emision)} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Tipo de Orden" value={LiquidacionMat?.tipo_orden} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Nombre del Cliente" value={LiquidacionMat?.nom_cliente} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Teléfono" value={LiquidacionMat?.telefono} />

      <Divider style={{marginVertical: 16}} />

      {/* <LabelValueRow label="Estado de Acta" value={LiquidacionMat?.} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Estado Orden" value={LiquidacionMat?.obse_ejecutado} />

      <Divider style={{marginVertical: 16}} />

      <LabelValueRow label="Estado Materiales" value={LiquidacionMat?.obse_ejecutado} /> */}
    </CustomScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
