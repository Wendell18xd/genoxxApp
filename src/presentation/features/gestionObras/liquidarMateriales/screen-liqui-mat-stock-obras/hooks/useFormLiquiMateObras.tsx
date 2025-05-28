import * as Yup from 'yup';
interface InitialValues {
  fecha: string;
}

const initialValues: InitialValues = {
  fecha: new Date().toISOString().slice(0, 10),
};

export const useFormLiquiMateObras = () => {
  const getValidationSchema = () =>
    Yup.object().shape({
      fecha: Yup.string().required('Seleccione una fecha'),
    });

  const handleSaveLiquidacion = (values: InitialValues) => {
    console.log(values);
  };

  return {
    //* Propiedades
    initialValues,

    //* Metodos
    getValidationSchema,
    handleSaveLiquidacion,
  };
};
