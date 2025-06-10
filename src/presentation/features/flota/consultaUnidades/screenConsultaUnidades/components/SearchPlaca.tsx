import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchConsulta} from '../hooks/useSearchConsulta';

interface Props {
  onClose?: () => void;
}

export const SearchPlaca = ({onClose}: Props) => {
  const {initialValues, isFetchConsulta, handleSearch} = useSearchConsulta();

  return (
    <View>
      {isFetchConsulta && <FullScreenLoader transparent />}
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
                label="Ingrese el número de placa"
                mode="outlined"
                value={values.nro_placa}
                onChangeText={handleChange('nro_placa')}
                onBlur={handleBlur('nro_placa')}
                error={touched.nro_placa && !!errors.nro_placa}
                style={{width: '100%'}}
              />

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
