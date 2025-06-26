import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useSearchConsultaEjecucion} from '../hooks/useSearchConsultaEjecucion';
import CustomDateRangePicker from '../../../../components/ui/CustomDateRangePicker';
import { View } from 'react-native';

interface Props {
  onClose?: () => void;
}

export const SearchConsultaEjecucion = ({onClose}: Props) => {
  const {
    initialValues,
    isFetchConsultarEjecucion,
    handleSearch,
    getValidationSchema,
  } = useSearchConsultaEjecucion();

  return (
    <View>
      {isFetchConsultarEjecucion && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}
        validationSchema={getValidationSchema}>
        {({handleSubmit, setFieldValue, values, errors, touched}) => {
          return (
            <View style={{padding: 8}}>
              <CustomDateRangePicker
                label="Rango de fechas"
                desde={values.txt_fecha_inicio}
                hasta={values.txt_fecha_final}
                onChange={(start, end) => {
                  setFieldValue('txt_fecha_inicio', start);
                  setFieldValue('txt_fecha_final', end);
                }}
                error={
                  (touched.txt_fecha_inicio && !!errors.txt_fecha_inicio) ||
                  (touched.txt_fecha_final && !!errors.txt_fecha_final)
                }
              />
              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchConsultarEjecucion}
                loading={isFetchConsultarEjecucion}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
