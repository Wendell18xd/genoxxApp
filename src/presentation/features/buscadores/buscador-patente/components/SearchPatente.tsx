import {Formik} from 'formik';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {useSearchPatente} from '../hooks/useSearchPatente';

interface Props {
  onClose?: () => void;
}

export const SearchPatente = ({onClose}: Props) => {
  const {initialValues, isFetchPatente, handleSearch, getValidationSchema} =
    useSearchPatente();

  return (
    <View>
      {isFetchPatente && <FullScreenLoader transparent />}
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
        }) => {
          return (
            <View style={{padding: 16}}>
              <CustomTextInput
                label="Buscar patente"
                mode="outlined"
                value={values.nro_placa}
                onChangeText={handleChange('nro_placa')}
                onBlur={handleBlur('nro_placa')}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    forceTextInputFocus={false}
                    onPress={() => handleSubmit()}
                  />
                }
                error={touched.nro_placa && !!errors.nro_placa}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
