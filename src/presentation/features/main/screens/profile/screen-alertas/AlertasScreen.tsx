import {TextInput} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import FABAudioBottom from '../Components/FABAudioBottom';
import {Formik} from 'formik';
import GuardarBottom from '../Components/GuardarBottom';
import { useAlertas } from './hooks/useAlertas';


export const AlertasScreen = () => {
  // Usa tu hook aquí
  const {formValues, tipos, startAlertaSubmit, isFetching} = useAlertas();

  if (isFetching) {return null;}

  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <Formik
        initialValues={formValues}
        onSubmit={(values, {resetForm}) => {
          startAlertaSubmit(values, resetForm);
        }}>
        {({values, setFieldValue, handleSubmit}) => (
          <View style={{padding: 8, width: '100%'}}>
            <View style={{marginBottom: 12}}>
              {tipos && (
                <Dropdown
                  label="Tipo"
                  mode="outlined"
                  options={tipos}
                  value={values.tipo}
                  onSelect={val => setFieldValue('tipo', val)}
                />
              )}
            </View>
            <CustomTextInput
              label="Número de teléfono"
              mode="outlined"
              keyboardType="numeric"
              value={values.telefono}
              onChangeText={text => {
                const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, 9);
                setFieldValue('telefono', onlyNumbers);
              }}
              left={<TextInput.Icon icon="phone" />}
            />
            <CustomTextInput
              placeholder="Comentario"
              mode="outlined"
              value={values.comentario}
              onChangeText={text => setFieldValue('comentario', text)}
              multiline={true}
              numberOfLines={5}
              style={{height: 150, marginTop: 12}}
            />
            <GuardarBottom onPress={handleSubmit} />
            <View>
              <FABAudioBottom />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaLayout>
  );
};
