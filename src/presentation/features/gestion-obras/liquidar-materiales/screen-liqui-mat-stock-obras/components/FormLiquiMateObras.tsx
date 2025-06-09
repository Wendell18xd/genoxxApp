import {Formik} from 'formik';
import CustomDatePicker from '../../../../../components/ui/CustomDatePicker';
import {FlatList, View} from 'react-native';
import {useFormLiquiMateObras} from '../hooks/useFormLiquiMateObras';
import {Text} from 'react-native-paper';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import {useEffect, useState} from 'react';
import SinResultados from '../../../../../components/ui/SinResultados';
import {useLiquiMatObras} from '../hooks/useLiquiMatObras';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import Toast from 'react-native-toast-message';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {ItemStockMateObras} from './items/ItemStockMateObras';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {MaterialesLiquiRequest} from '../../../../../../infrastructure/interfaces/gestion-obras/liquidar-materiales/saveLiquiMateObra.request';

interface Props {
  isRegulariza: boolean;
}

export const FormLiquiMateObras = ({isRegulariza}: Props) => {
  const {
    guias,
    initialValues,
    mutation,
    refetchStock,
    getValidationSchema,
    handleSaveLiquidacion,
    handleIntentoCambioGuia,
    setRefetchStock,
  } = useFormLiquiMateObras();

  const [localGuia, setLocalGuia] = useState('TODOS');

  const {dataStock, isFetchingStock, errorStock, handleListarStock} =
    useLiquiMatObras();
  const {guiaSeleccionada} = useLiquiMateStore();

  const filteredStock =
    guiaSeleccionada === 'TODOS'
      ? dataStock
      : dataStock?.filter(item => item.guia_codigo === guiaSeleccionada);

  const materialesFormik: MaterialesLiquiRequest[] | undefined =
    filteredStock?.map(item => ({
      vl_mate_codigo: item.mate_codigo,
      vl_guia_codigo: item.guia_codigo,
      vl_guia_numero: item.guia_numero,
      vl_mate_lote: item.mate_lote,
      vl_mate_cantidad: 0, // valor editable
      vl_mate_observacion: '', // valor editable
    }));

  console.log(materialesFormik);

  useEffect(() => {
    if (errorStock) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener el stock de materiales',
      });
    }
  }, [errorStock]);

  useEffect(() => {
    if (refetchStock) {
      handleListarStock(isRegulariza);
      setRefetchStock(false);
    }
  }, [refetchStock]);

  if (!dataStock && isFetchingStock) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {mutation.isPending && (
        <FullScreenLoader transparent />
      )}
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
          materiales: materialesFormik ?? [],
        }}
        onSubmit={(values, {resetForm}) => {
          handleSaveLiquidacion(values, resetForm, setLocalGuia);
        }}
        validationSchema={getValidationSchema}>
        {({
          handleSubmit,
          handleReset,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={{flex: 1, position: 'relative'}}>
              {isFetchingStock && dataStock && <FullScreenLoader transparent />}

              {filteredStock && filteredStock.length > 0 ? (
                <FlatList
                  data={filteredStock}
                  renderItem={({item, index}) => (
                    <ItemStockMateObras
                      item={item}
                      index={index}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  keyExtractor={item =>
                    item.mate_codigo + item.guia_codigo + item.guia_numero
                  }
                  refreshing={isFetchingStock}
                  onRefresh={() => handleListarStock(isRegulariza)}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{gap: 16}}
                  ListHeaderComponent={
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
                        <Text style={{color: 'red', marginTop: 4}}>
                          {errors.fecha}
                        </Text>
                      )}
                      {guias && !isRegulariza && (
                        <CustomDropdownInput
                          label="Seleccione Guía"
                          options={guias}
                          value={localGuia}
                          onSelect={val =>
                            handleIntentoCambioGuia(
                              val,
                              setFieldValue,
                              setLocalGuia,
                              localGuia || 'TODOS',
                              values.materiales,
                              handleReset,
                            )
                          }
                        />
                      )}
                    </View>
                  }
                />
              ) : (
                <SinResultados message="No hay materiales en stock" />
              )}
              <CustomFAB
                icon="content-save"
                onPress={() => handleSubmit()}
                style={{bottom: 0, right: 0}}
                loading={mutation.isPending}
              />
            </View>
          );
        }}
      </Formik>
    </>
  );
};
