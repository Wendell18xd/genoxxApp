import {Formik} from 'formik';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSearchPatente} from '../hooks/useSearchPatente';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomTextInput from '../../../../components/ui/CustomTextInput';

interface Props {
  onClose?: () => void;
}

export const SearchPatente = ({onClose}: Props) => {
  const {initialValues, isFetchConsultaPatente, handleSearch} =
    useSearchPatente();

  return (
    <View>
      {isFetchConsultaPatente && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={{padding: 8}}>
              <CustomTextInput
                label="Buscar"
                mode="outlined"
                value={values.txt_codigo}
                onChangeText={handleChange('txt_codigo')}
                onBlur={handleBlur('txt_codigo')}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    onPress={() => handleSubmit()}
                  />
                }
                error={touched.txt_codigo && !!errors.txt_codigo}
                style={{width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
