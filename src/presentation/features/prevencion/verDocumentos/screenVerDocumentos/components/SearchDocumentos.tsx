import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import { useSearchDocumentos } from '../hooks/useSearchDocumentos';
import { Text, TextInput } from 'react-native-paper';

interface Props {
  onClose?: () => void;
}

export const SearchDocumentos = ({onClose}: Props) => {
  const {initialValues, isFetchConsulta, handleSearch, handleSelectPersonal,
    getValidationSchema} = useSearchDocumentos();

  return (
    <View>
      {isFetchConsulta && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}
        validationSchema={getValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => {
          return (
            <View style={{padding: 8}}>

              <CustomTextInput
                label="Buscar personal"
                mode="outlined"
                value={values.personal}
                onChangeText={handleChange('txt_cod_trabajador')}
                onBlur={handleBlur('txt_cod_trabajador')}
                editable={false}
                right={
                  <TextInput.Icon
                    icon={
                      values.txt_cod_trabajador &&
                      values.txt_cod_trabajador.length > 0
                        ? 'close'
                        : 'magnify'
                    }
                    onPress={() => {
                        handleSelectPersonal(values.personal, setFieldValue);
                    }}
                  />
                }
                error={
                  touched.txt_cod_trabajador && !!errors.txt_cod_trabajador
                }
                style={{width: '100%'}}
              />
              {touched.txt_cod_trabajador && errors.txt_cod_trabajador && (
                <Text style={{color: 'red', marginBottom: 4}}>
                  {errors.txt_cod_trabajador}
                </Text>
              )}

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchConsulta}
                loading={isFetchConsulta}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
