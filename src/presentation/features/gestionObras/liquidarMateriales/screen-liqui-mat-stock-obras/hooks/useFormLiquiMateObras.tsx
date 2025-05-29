import * as Yup from 'yup';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {Alert} from 'react-native';
import {MaterialesLiquiRequest} from '../../../../../../infrastructure/interfaces/gestionObras/liquidar-materiales/saveLiquiMateObra.request';
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
  const {guias, setGuiaSeleccionada} = useLiquiMateStore();

  const getValidationSchema = () =>
    Yup.object().shape({
      fecha: Yup.string().required('Seleccione una fecha'),
    });

  const handleSaveLiquidacion = (
    values: InitialValues,
    resetForm: () => void,
  ) => {
    console.log(values);
    resetForm();
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

    //* Metodos
    getValidationSchema,
    handleSaveLiquidacion,
    handleIntentoCambioGuia,
  };
};
