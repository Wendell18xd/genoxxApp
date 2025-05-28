import {Formik} from 'formik';
import CustomDatePicker from '../../../../../components/ui/CustomDatePicker';
import {View} from 'react-native';
import {useFormLiquiMateObras} from '../hooks/useFormLiquiMateObras';
import {Text} from 'react-native-paper';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';

interface Props {
  isRegulariza: boolean;
}

export const FormLiquiMateObras = ({isRegulariza}: Props) => {
  const {guias, setGuiaSeleccionada} = useLiquiMateStore();
  const {initialValues, getValidationSchema, handleSaveLiquidacion} =
    useFormLiquiMateObras();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleSaveLiquidacion(values)}
      validationSchema={getValidationSchema}>
      {({setFieldValue, values, errors, touched}) => {
        return (
          <View>
            <CustomDatePicker
              label="Fecha Liquidación"
              placeholder="Selecciona una fecha de liquidación"
              value={values.fecha}
              style={{marginBottom: 8}}
              onChange={val => setFieldValue('fecha', val)}
              error={touched.fecha && !!errors.fecha}
            />
            {touched.fecha && errors.fecha && (
              <Text style={{color: 'red', marginTop: 4}}>{errors.fecha}</Text>
            )}
            {guias && !isRegulariza && (
              <CustomDropdownInput
                label="Seleccione Guía"
                options={guias}
                value={values.guia}
                onSelect={val => {
                  setFieldValue('guia', val);
                  setGuiaSeleccionada(val || 'TODOS');
                }}
              />
            )}
          </View>
        );
      }}
    </Formik>
  );
};
