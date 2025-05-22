import {TextInput} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {useState} from 'react';
import GuardarBottom from '../Components/GuardarBottom';
import FABAudioBottom from '../Components/FABAudioBottom';

interface AlertasFromValues {
  tipo: string;
  telefono: string;
  comentario: string;
}

const initialValues: AlertasFromValues = {
  tipo: '',
  telefono: '',
  comentario: '',
};

export const AlertasScreen = () => {
  const [comentario, setComentario] = useState('');
    const [formValues, setFormValues] =
      useState<AlertasFromValues>(initialValues);
  const [telefono, setTelefono] = useState('');
  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <View style={{padding: 8, width: '100%'}}>
        <View style={{marginBottom: 12}}>
          <Dropdown
            label="Tipo"
            // placeholder="Seleccione un proyecto"
            mode="outlined"
            options={[]}
            // value={values.proyecto}
            // onSelect={val => setFieldValue('proyecto', val)}
          />
        </View>
        <CustomTextInput
          label="Número de teléfono"
          mode="outlined"
          keyboardType="numeric"
          value={telefono}
          onChangeText={text => {
            const onlyNumbers = text.replace(/[^0-9]/g,'');
            setTelefono(onlyNumbers);
          }}
          left={<TextInput.Icon icon="phone" />}
        />
        <CustomTextInput
          placeholder="Comentario"
          mode="outlined"
          value={comentario}
          onChangeText={setComentario}
          multiline={true}
          numberOfLines={5}
          style={{height: 150, marginTop: 12}}
        />
        <GuardarBottom />
        <View>
          <FABAudioBottom />
        </View>
      </View>
    </SafeAreaLayout>
  );
};
