import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useSearchConsultaEjecucion} from '../hooks/useSearchConsultaEjecucion';
import CustomDateRangePicker from '../../../../components/ui/CustomDateRangePicker';
import {View} from 'react-native';
import {CustomDropdownInput} from '../../../../components/ui/CustomDropdownInput';
import {Text, TextInput} from 'react-native-paper';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import CustomTimePicker from '../../../../components/ui/CustomTimePicker';
import {useState} from 'react';
import {Option} from 'react-native-paper-dropdown';

interface Props {
  onClose?: () => void;
}

export const SearchConsultaEjecucion = ({onClose}: Props) => {
  const {
    initialValues,
    isFetchConsultarEjecucion,
    handleSearch,
    getValidationSchema,
    ejecucion,
    tiposItem,
    proyectos,
    isFetchProyectos,
    originalActividades,
  } = useSearchConsultaEjecucion();

  const [actividadesFiltradas, setActividadesFiltradas] = useState<Option[]>(
    [],
  );

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
              {/* Fecha */}
              <View style={{marginBottom: 16}}>
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
              </View>

              {/* Ítem */}
              <View style={{marginBottom: 16}}>
                <CustomDropdownInput
                  label="Seleccione tipo de búsqueda"
                  options={tiposItem || []}
                  value={values.cbo_elegido}
                  onSelect={val => setFieldValue('cbo_elegido', val)}
                  error={touched.cbo_elegido && !!errors.cbo_elegido}
                  loading={!ejecucion && isFetchConsultarEjecucion}
                  disabled={!ejecucion && isFetchConsultarEjecucion}
                />
                {touched.cbo_elegido && errors.cbo_elegido && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.cbo_elegido}
                  </Text>
                )}
              </View>

              {/* Proyecto */}
              {values.cbo_elegido === 'ACTI' && (
                <View style={{marginBottom: 16}}>
                  <CustomDropdownInput
                    label="Seleccione Proyecto"
                    options={proyectos || []}
                    value={values.vl_proy_tipo ?? ''}
                    onSelect={val => {
                      setFieldValue('vl_proy_tipo', val);
                      if (values.cbo_elegido === 'ACTI') {
                        const actividadesProyecto = originalActividades.filter(
                          act => act.cont_campo05 === val,
                        );
                        setActividadesFiltradas(
                          actividadesProyecto.map(act => ({
                            label: act.cont_campo01,
                            value: act.cont_parametro,
                          })),
                        );
                      } else {
                        setActividadesFiltradas([]);
                      }
                    }}
                    error={touched.vl_proy_tipo && !!errors.vl_proy_tipo}
                    loading={!proyectos && isFetchProyectos}
                    disabled={!proyectos && isFetchProyectos}
                  />
                  {touched.vl_proy_tipo && errors.vl_proy_tipo && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.vl_proy_tipo}
                    </Text>
                  )}
                </View>
              )}
              <View style={{marginBottom: 16}}>
                {values.cbo_elegido === 'ACTI' ? (
                  <CustomDropdownInput
                    label="Seleccione Actividad"
                    options={actividadesFiltradas}
                    value={values.txt_actividad ?? ''}
                    onSelect={val => setFieldValue('txt_actividad', val)}
                    error={touched.txt_actividad && !!errors.txt_actividad}
                    disabled={!values.vl_proy_tipo || actividadesFiltradas.length === 0}
                  />
                ) : values.cbo_elegido === 'HORA' ? (
                  <CustomTimePicker
                    label="Hora"
                    value={values.txt_hora}
                    onChange={time => setFieldValue('txt_hora', time)}
                    disabled={false}
                  />
                ) : (
                  <CustomTextInput
                    label="Buscar"
                    mode="outlined"
                    value={values.txt_buscar}
                    onChangeText={text => setFieldValue('txt_buscar', text)}
                    left={<TextInput.Icon icon="magnify" />}
                    disabled={false}
                  />
                )}
              </View>

              {/* Botón de búsqueda */}
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
