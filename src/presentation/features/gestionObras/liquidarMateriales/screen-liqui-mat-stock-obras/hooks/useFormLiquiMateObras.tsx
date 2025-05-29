import * as Yup from 'yup';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {Alert} from 'react-native';
interface InitialValues {
  fecha: string;
  guia: string;
}

const initialValues: InitialValues = {
  fecha: new Date().toISOString().slice(0, 10),
  guia: 'TODOS',
};

export const useFormLiquiMateObras = () => {
  const {
    guias,
    setGuiaSeleccionada: setGuiaSeleccionadaStore,
    materialesSeleccionados,
    setMaterialesSeleccionados,
  } = useLiquiMateStore();

  const getValidationSchema = () =>
    Yup.object().shape({
      fecha: Yup.string().required('Seleccione una fecha'),
    });

  const handleSaveLiquidacion = (values: InitialValues) => {
    console.log(values);
  };

  const handleIntentoCambioGuia = (
    nuevaGuia: string | undefined,
    setFormikValue: (field: string, value: any) => void,
    setLocalGuia: (value: string) => void,
    guiaActualFormik: string,
  ) => {
    // Cambia visualmente para mostrar lo seleccionado
    setLocalGuia(nuevaGuia || 'TODOS');

    if (materialesSeleccionados.length > 0) {
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
              setGuiaSeleccionadaStore(val);
              setMaterialesSeleccionados([]);
            },
          },
        ],
      );
    } else {
      const val = nuevaGuia || 'TODOS';
      setFormikValue('guia', val);
      setGuiaSeleccionadaStore(val);
    }
  };

  return {
    //* Propiedades
    initialValues,
    guias,

    //* Metodos
    getValidationSchema,
    handleSaveLiquidacion,
    handleIntentoCambioGuia,
  };
};
