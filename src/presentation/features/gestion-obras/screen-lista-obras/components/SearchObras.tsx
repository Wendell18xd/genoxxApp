import {useQueryClient} from '@tanstack/react-query';
import {Formik} from 'formik';
import {useEffect} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import {CustomDropdownInput} from '../../../../components/ui/CustomDropdownInput';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useSarchObras} from '../hooks/useSarchObras';
import {IconButton, Text} from 'react-native-paper';
import {useObrasNavigationStore} from '../../store/useObrasNavigationStore';

interface Props {
  onClose?: () => void;
}

export const SearchObras = ({onClose}: Props) => {
  const {seleccionarOpcion} = useObrasNavigationStore();

  const {
    tiposBusqueda,
    initialValues,
    proyectos,
    isFetchProyecto,
    isFetchObras,
    errorProyectos,
    handleSearch,
    getValidationSchema,
    refetchProyectos,
  } = useSarchObras();

  const queryClient = useQueryClient();

  useEffect(() => {
    refetchProyectos();
  }, []);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['proyectos', 'liquidacion', 'materiales'],
      });
    };
  }, []);

  useEffect(() => {
    if (errorProyectos) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las obras',
      });
    }
  }, [errorProyectos]);

  return (
    <View>
      {!proyectos && isFetchProyecto && <FullScreenLoader transparent />}
      {isFetchObras && <FullScreenLoader transparent />}

      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        {/* Texto centrado */}
        <Text
          variant="titleLarge"
          style={{
            position: 'absolute',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Buscar obra
        </Text>

        {/* Flecha encima */}
        <IconButton
          icon="arrow-left"
          onPress={() => seleccionarOpcion('menu')}
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 10,
          }}
        />
      </View>

      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}
        validationSchema={getValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={{padding: 8}}>
              <View>
                <CustomDropdownInput
                  label="Seleccione Proyecto"
                  options={proyectos || []}
                  value={values.cbo_proy_codigo}
                  onSelect={val => setFieldValue('cbo_proy_codigo', val)}
                  error={touched.cbo_proy_codigo && !!errors.cbo_proy_codigo}
                />
                {touched.cbo_proy_codigo && errors.cbo_proy_codigo && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.cbo_proy_codigo}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 8, flexDirection: 'row', gap: 8}}>
                <View style={{flex: 0.4}}>
                  <CustomDropdownInput
                    label="Tipo búsqueda"
                    options={tiposBusqueda}
                    value={values.cbo_tipo}
                    onSelect={val => setFieldValue('cbo_tipo', val)}
                  />
                </View>
                <View style={{flex: 0.6}}>
                  <CustomTextInput
                    label="Buscar"
                    mode="outlined"
                    value={values.txt_busqueda}
                    onChangeText={handleChange('txt_busqueda')}
                    onBlur={handleBlur('txt_busqueda')}
                    error={touched.txt_busqueda && !!errors.txt_busqueda}
                  />
                </View>
              </View>

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchObras}
                loading={isFetchObras}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
