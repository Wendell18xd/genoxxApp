import {Text, TextInput} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {View} from 'react-native';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import FABAudioBottom from '../Components/FABAudioBottom';
import {Formik} from 'formik';
import {useAlertas} from './hooks/useAlertas';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';

export const AlertasScreen = () => {
  const {
    formValues,
    tipos,
    startAlertaSubmit,
    isFetching,
    getAlertValidationSchema,
  } = useAlertas();

  if (isFetching) {
    return null;
  }

  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <Formik
        initialValues={formValues}
        validationSchema={getAlertValidationSchema}
        onSubmit={(values, {resetForm}) => {
          startAlertaSubmit(values, resetForm);
        }}>
        {({values, setFieldValue, handleSubmit, touched, errors}) => {
          return (
            <View style={{padding: 8}}>
              <View>
                <CustomDropdownInput
                  icon="lightbulb-outline"
                  label="Tipo"
                  options={tipos || []}
                  value={values.tipo}
                  onSelect={val => setFieldValue('tipo', val)}
                  error={touched.tipo && !!errors.tipo}
                />
                {touched.tipo && errors.tipo && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.tipo}
                  </Text>
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
                error={touched.telefono && !!errors.telefono}
              />
              {touched.telefono && errors.telefono && (
                <Text style={{color: 'red', marginTop: 4}}>
                  {errors.telefono}
                </Text>
              )}
              <CustomTextInput
                placeholder="Comentario"
                mode="outlined"
                value={values.comentario}
                onChangeText={text => setFieldValue('comentario', text)}
                multiline={true}
                numberOfLines={5}
                style={{height: 150, marginTop: 12}}
                error={touched.comentario && !!errors.comentario}
                placeholderTextColor={touched.comentario && !!errors.comentario ? '#A72626' : '#5A5261'}
              />
              {touched.comentario && errors.comentario && (
                <Text style={{color: 'red', marginTop: 4}}>
                  {errors.comentario}
                </Text>
              )}
              <PrimaryButton
                icon="content-save"
                style={{marginTop: 16, width: '100%', height: 48}}
                onPress={handleSubmit}>
                Enviar
              </PrimaryButton>
              <View>
                <FABAudioBottom />
              </View>
            </View>
          );
        }}
      </Formik>
    </SafeAreaLayout>
  );
};
