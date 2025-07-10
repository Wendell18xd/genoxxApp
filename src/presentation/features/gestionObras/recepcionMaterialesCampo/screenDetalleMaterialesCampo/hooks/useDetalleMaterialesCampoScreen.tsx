import {useEffect, useState} from 'react';
import {Foto} from '../../../../../../domain/entities/Foto';
import {useCamera} from '../../../../foto/hooks/useCamera';
import {useFotosStore} from '../../../../foto/store/useFotosStore';
import {format} from 'date-fns';
import {FormikHelpers, FormikProps} from 'formik';
import * as Yup from 'yup';

export interface initialValuesProps {
  nro_guia: string;
  fecha_ejecucion: string;
  hora_ejecucion: string;
  fotos: Foto[];
}

const initialValues: initialValuesProps = {
  nro_guia: '',
  fecha_ejecucion: format(new Date(), 'yyyy-MM-dd'),
  hora_ejecucion: format(new Date(), 'HH:mm'),
  fotos: [],
};

export const useDetalleMaterialesCampoScreen = (
  formikRef: React.RefObject<FormikProps<initialValuesProps> | null>,
) => {
  const {fotos, handleDelete, isRendering, handleCamera} = useCamera();
  const {onReset: onResetFotos, setInitialParams, setFotos} = useFotosStore();
  const [visible, setVisible] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);

  const getValidationSchema = () =>
    Yup.object().shape({
      nro_guia: Yup.string().required('Ingrese el número de guía'),
      fecha_ejecucion: Yup.string().required(
        'Seleccione una fecha de ejecución',
      ),
      hora_ejecucion: Yup.string().required('Ingrese la hora de ejecución'),
    });

  const abrirVisor = (index: number) => {
    setIndexSeleccionado(index);
    setVisible(true);
  };

  const syncFotosWithFormik = () => {
    const setFieldValue = formikRef?.current?.setFieldValue;
    if (setFieldValue) {
      setFieldValue('fotos', fotos);
    }
  };

  const handleDeleteFoto = (
    index: number,
    values: initialValuesProps,
    setFieldValue: FormikHelpers<initialValuesProps>['setFieldValue'],
  ) => {
    const nuevas = [...values.fotos];
    nuevas.splice(index, 1);
    setFieldValue('fotos', nuevas);
    handleDelete(index);
  };

  const handleChangeDescriptionFoto = (
    index: number,
    values: initialValuesProps,
    text: string,
    setFieldValue: FormikHelpers<initialValuesProps>['setFieldValue'],
  ) => {
    const nuevas = [...values.fotos];
    nuevas[index] = {
      ...nuevas[index],
      comentario: text,
    };
    setFieldValue('fotos', nuevas);
    setFotos(nuevas);
  };

  const handleSaveMaterialesCampo = (values: initialValuesProps) => {
    console.log(values);
  };

  useEffect(() => {
    setInitialParams({
      minFotos: 1,
      maxFotos: 5,
    });
    setFormValues(prev => ({
      ...prev,
      fecha_ejecucion: format(new Date(), 'yyyy-MM-dd'),
      hora_ejecucion: format(new Date(), 'HH:mm'),
    }));
  }, []);

  useEffect(() => {
    syncFotosWithFormik();
  }, [fotos]);

  return {
    //* Propiedades
    initialValues: formValues,
    isRendering,
    visible,
    indexSeleccionado,

    //* Metodos
    getValidationSchema,
    handleCamera,
    onResetFotos,
    abrirVisor,
    setVisible,
    handleDeleteFoto,
    handleChangeDescriptionFoto,
    handleSaveMaterialesCampo,
  };
};
