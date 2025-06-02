import * as Yup from 'yup';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {Alert} from 'react-native';
import {MaterialesLiquiRequest} from '../../../../../../infrastructure/interfaces/obras/liquidar-materiales/saveLiquiMateObra.request';
import {useMutation} from '@tanstack/react-query';
import {grabarMaterialesObras} from '../../../../../../actions/obras/stock.obras';
import Toast from 'react-native-toast-message';
import {ToastNativo} from '../../../../../helper/utils';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef, useState} from 'react';
import {useObrasStore} from '../../../store/useObrasStore';
interface InitialValues {
  fecha: string;
  guia: string;
  materiales: MaterialesLiquiRequest[];
}

const initialValues: InitialValues = {
  fecha: new Date().toISOString().slice(0, 10),
  guia: 'TODOS',
  materiales: [],
};

export const useFormLiquiMateObras = () => {
  const {guias, setGuiaSeleccionada, setIsRefetchLiquidacion} =
    useLiquiMateStore();
  const {obra} = useObrasStore();
  const [refetchStock, setRefetchStock] = useState(true);
  const {user} = useAuthStore();
  const resetFormRef = useRef<(() => void) | null>(null);
  const setLocalGuiaRef = useRef<((val: string) => void) | null>(null);

  const getValidationSchema = () =>
    Yup.object().shape({
      fecha: Yup.string().required('Seleccione una fecha'),
    });

  const mutation = useMutation({
    mutationFn: grabarMaterialesObras,
    onSuccess: data => {
      const estado = data.datos;

      if (estado === 2) {
        ToastNativo({
          mensaje: 'Con fecha de liquidacion, se encontro la acta cerrada',
          titulo: 'No se puede grabar',
        });
        return;
      }

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Materiales grabados correctamente',
        });
        resetFormRef.current?.();
        setLocalGuiaRef.current?.('TODOS');
        setRefetchStock(true);
        setIsRefetchLiquidacion(true);
      } else {
        Toast.show({type: 'error', text1: 'Error al grabar materiales'});
      }
    },
    onError: error => {
      Toast.show({type: 'error', text1: error.message});
    },
  });

  const handleSaveLiquidacion = (
    values: InitialValues,
    resetForm: () => void,
    setLocalGuia: (val: string) => void,
  ) => {
    const mateSeleccionados = values.materiales.filter(
      m => parseFloat(m.vl_mate_cantidad.toString()) > 0,
    );

    if (mateSeleccionados.length === 0) {
      ToastNativo({
        mensaje: 'No hay materiales seleccionados',
        titulo: 'Error',
        isAlert: true,
      });
      return;
    }

    resetFormRef.current = resetForm;
    setLocalGuiaRef.current = setLocalGuia;

    mutation.mutate({
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      vg_usua_perfil: user?.usua_perfil || '',
      vl_usua_tipo: user?.usua_tipo || '',
      vl_regi_codigo: obra?.regi_codigo || '',
      vl_maneja_stock_guia: obra?.maneja_stock_guia || '',
      vl_fecha_liquidacion: values.fecha,
      vl_materiales: mateSeleccionados,
    });
  };

  const handleIntentoCambioGuia = (
    nuevaGuia: string | undefined,
    setFormikValue: (field: string, value: any) => void,
    setLocalGuia: (value: string) => void,
    guiaActualFormik: string,
    materiales: MaterialesLiquiRequest[],
    handleReset: () => void,
  ) => {
    setLocalGuia(nuevaGuia || 'TODOS');

    // Verificar si hay algún material con cantidad > 0
    const hayMaterialesSeleccionados = materiales.some(
      m => parseFloat(m.vl_mate_cantidad.toString()) > 0,
    );

    if (hayMaterialesSeleccionados) {
      Alert.alert(
        'No se puede cambiar el filtro de guía',
        'Tienes materiales seleccionados, si cambias el filtro se perderán los datos',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {
              // Revertir visual
              setLocalGuia(guiaActualFormik);
            },
          },
          {
            text: 'Continuar',
            onPress: () => {
              const val = nuevaGuia || 'TODOS';
              setFormikValue('guia', val);
              setGuiaSeleccionada(val);
              handleReset(); // Reiniciar formulario
            },
          },
        ],
      );
    } else {
      const val = nuevaGuia || 'TODOS';
      setFormikValue('guia', val);
      setGuiaSeleccionada(val);
    }
  };

  return {
    //* Propiedades
    initialValues,
    guias,
    mutation,
    refetchStock,

    //* Metodos
    getValidationSchema,
    handleSaveLiquidacion,
    handleIntentoCambioGuia,
    setRefetchStock,
  };
};
