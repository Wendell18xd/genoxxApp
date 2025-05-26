import {ScrollView, StyleSheet, View} from 'react-native';
import {useLiquiMateStore} from '../store/useLiquiMateStore';
import {CustomCardContent} from '../../../../components/ui/CustomCardContent';
import {Text} from 'react-native-paper';
import {formatearNumero} from '../../../../helper/moneyUtils';
import {useAuthStore} from '../../../../store/auth/useAuthStore';

interface Props {
  label: string;
  value?: string | number;
}

const LabelValueRow = ({label, value}: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
};

export const DetalleObraScreen = () => {
  const {obra} = useLiquiMateStore();
  const {user} = useAuthStore();

  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <CustomCardContent mode="contained">
        <LabelValueRow label="Nro Orden" value={obra?.nro_orden} />
        <LabelValueRow label="Nro Orden 2" value={obra?.nro_orden2} />
        <LabelValueRow label="Proyecto" value={obra?.proy_nombre} />
        <LabelValueRow label="Tipo Obra" value={obra?.tipo_obra} />
        <LabelValueRow label="Nombre" value={obra?.nombre} />
        <LabelValueRow label="Dirección" value={obra?.direccion} />
        <LabelValueRow label="Distrito" value={obra?.distrito} />
        <LabelValueRow label="Supervisor" value={obra?.nom_supervisor} />
        <LabelValueRow label="Observación" value={obra?.observacion} />
        <LabelValueRow
          label="MO Ejecutado"
          value={formatearNumero({
            valor: obra?.mo_ejecutado || 0,
            pais: user?.empr_pais,
          })}
        />
        <LabelValueRow
          label="MA Ejecutado"
          value={formatearNumero({
            valor: obra?.ma_ejecutado || 0,
            pais: user?.empr_pais,
          })}
        />
        <LabelValueRow
          label="Facturado"
          value={formatearNumero({
            valor: obra?.total_facturado || 0,
            pais: user?.empr_pais,
          })}
        />
      </CustomCardContent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  value: {
    color: '#111',
    flex: 1,
    textAlign: 'right',
  },
});
