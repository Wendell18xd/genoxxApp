import {Formik} from 'formik';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {useSearchPersonal} from '../hooks/useSearchPersonal';

interface Props {
  onClose?: () => void;
}

export const SearchPersonal = ({onClose}: Props) => {
  const {initialValues, isFetchPersonal, getValidationSchema, handleSearch} =
    useSearchPersonal();

  return (
    <View>
      {isFetchPersonal && <FullScreenLoader transparent />}
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
                label="Buscar personal"
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
