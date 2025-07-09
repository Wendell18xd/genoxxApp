import {View} from 'react-native';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {initialValuesProps} from '../hooks/useDetalleMaterialesCampoScreen';
import {
  FormikErrors,
  FormikHandlers,
  FormikHelpers,
  FormikTouched,
} from 'formik';
import CustomDateCalendarPicker from '../../../../../components/ui/CustomDateCalendarPicker';
import CustomTimePicker from '../../../../../components/ui/CustomTimePicker';
import {Divider, Text} from 'react-native-paper';

interface Props {
  values: initialValuesProps;
  errors: FormikErrors<initialValuesProps>;
  touched: FormikTouched<initialValuesProps>;
  handleBlur: FormikHandlers['handleBlur'];
  handleChange: FormikHandlers['handleChange'];
  setFieldValue: FormikHelpers<initialValuesProps>['setFieldValue'];
}

const DatosInicialesForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}: Props) => {
  return (
    <View style={{flex: 1}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Datos iniciales
      </Text>
      <Divider style={{marginVertical: 16}} />

      <View style={{marginBottom: 16}}>
        <CustomTextInput
          label="Nro de Guía"
          autoCapitalize="characters"
          value={values.nro_guia}
          onChangeText={handleChange('nro_guia')}
          onBlur={handleBlur('nro_guia')}
          error={touched.nro_guia && !!errors.nro_guia}
        />
        {touched.nro_guia && errors.nro_guia && (
          <Text style={{color: 'red', marginBottom: 4}}>{errors.nro_guia}</Text>
        )}
      </View>

      <View style={{flexDirection: 'row', gap: 16, marginBottom: 16}}>
        <View style={{flex: 0.5}}>
          <CustomDateCalendarPicker
            label="Fecha de ejecución"
            placeholder="Seleccione fecha de ejecución"
            value={values.fecha_ejecucion}
            onChange={val => setFieldValue('fecha_ejecucion', val)}
            error={touched.fecha_ejecucion && !!errors.fecha_ejecucion}
          />
        </View>
        <View style={{flex: 0.5}}>
          <CustomTimePicker
            label="Hora de ejecución"
            value={values.hora_ejecucion}
            onChange={hora => setFieldValue('hora_ejecucion', hora)}
            error={touched.hora_ejecucion && !!errors.hora_ejecucion}
          />
          {touched.hora_ejecucion && errors.hora_ejecucion && (
            <Text style={{color: 'red', marginTop: 4}}>
              {errors.hora_ejecucion}
            </Text>
          )}
        </View>
      </View>

      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Datos fotograficos
      </Text>
      <Divider style={{marginVertical: 16}} />
    </View>
  );
};
export default DatosInicialesForm;
