import {Formik} from 'formik';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {useSearchPatente} from '../hooks/useSearchPatente';

interface Props {
  onClose?: () => void;
}

export const SearchPatente = ({onClose}: Props) => {
  const {initialValues, isFetchPatente, getValidationSchema,  handleSearch} =
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
                value={values.txt_buscar}
                onChangeText={handleChange('txt_buscar')}
                onBlur={handleBlur('txt_buscar')}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    forceTextInputFocus={false}
                    onPress={() => handleSubmit()}
                  />
                }
                error={touched.txt_buscar && !!errors.txt_buscar}
              />
              {touched.txt_buscar && errors.txt_buscar && (
                <Text style={{color: 'red', marginBottom: 4}}>
                  {errors.txt_buscar}
                </Text>
              )}
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
