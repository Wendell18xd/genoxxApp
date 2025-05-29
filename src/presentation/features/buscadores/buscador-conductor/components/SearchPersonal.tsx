import {Formik} from 'formik';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import { useSearchPersonal } from '../hooks/useSearchPersonal';

interface Props {
  onClose?: () => void;
}

export const SearchPersonal = ({onClose}: Props) => {
  const {initialValues, isFetchPersonal, handleSearch} =
    useSearchPersonal();

  return (
    <View>
      {isFetchPersonal && <FullScreenLoader transparent />}
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
            <View style={{padding: 16}}>
              <CustomTextInput
                label="Buscar"
                mode="outlined"
                value={values.nom_para}
                onChangeText={handleChange('cod_para')}
                onBlur={handleBlur('cod_para')}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    forceTextInputFocus={false}
                    onPress={() => handleSubmit()}
                  />
                }
                error={touched.nom_para && !!errors.nom_para}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
