import {Formik} from 'formik';
import CustomDatePicker from '../../../../../components/ui/CustomDatePicker';
import {View} from 'react-native';
import {useFormLiquiMateObras} from '../hooks/useFormLiquiMateObras';
import {Text} from 'react-native-paper';

export const FormLiquiMateObras = () => {
  const {initialValues, getValidationSchema, handleSaveLiquidacion} =
    useFormLiquiMateObras();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleSaveLiquidacion(values)}
      validationSchema={getValidationSchema}>
      {({handleSubmit, setFieldValue, values, errors, touched}) => {
        return (
          <View style={{padding: 8}}>
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
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
