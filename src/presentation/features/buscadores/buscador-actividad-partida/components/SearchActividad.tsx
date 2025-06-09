import {Formik} from 'formik';
import {View} from 'react-native';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {useSearchActividad} from '../hooks/useSearchActividad';

export const SearchActividad = () => {
  const {
    initialValues,
    isFetchActividadPartida,
    getValidationSchema,
    handleSearch,
  } = useSearchActividad();

  return (
    <View>
      {isFetchActividadPartida && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values)}
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
            <View style={{marginBottom: 16}}>
              <CustomTextInput
                label="Buscar actividad"
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
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
