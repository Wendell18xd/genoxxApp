import {View} from 'react-native';
import {Text} from 'react-native-paper';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import CustomDateCalendarPicker from '../../../../../components/ui/CustomDateCalendarPicker';
import {useState} from 'react';
import {format} from 'date-fns';

interface Props {
  onClose?: () => void;
}

const GenerarAutoInspeccion = ({onClose}: Props) => {
  const [fecha, setFecha] = useState(format(new Date(), 'yyyy-MM-dd'));

  return (
    <View>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        {/* Texto centrado */}
        <Text
          variant="titleLarge"
          style={{
            position: 'absolute',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Generar auto inspección
        </Text>
      </View>

      <View style={{padding: 8}}>
        <View>
          <CustomDateCalendarPicker
            label="Fecha "
            placeholder="Selecciona una fecha"
            value={fecha}
            style={{marginBottom: 8}}
            onChange={val => setFecha(val)}
          />
        </View>

        <PrimaryButton
          label="Generar"
          onPress={() => onClose?.()}
          debounce
          icon="content-save"
          disabled={false}
          loading={false}
          style={{marginTop: 16, width: '100%'}}
        />
      </View>
    </View>
  );
};
export default GenerarAutoInspeccion;
