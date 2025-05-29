import {useLiquiMateStore} from '../../store/useLiquiMateStore';

export const useSaveLiquiMateObras = () => {
  const {obra, materialesSeleccionados, setMaterialesSeleccionados} =
    useLiquiMateStore();

  const handleSaveLiquidacion = () => {
    const materiales = materialesSeleccionados.filter(
      material => material.vl_mate_cantidad > 0,
    );
    console.log(materiales);
  };

  return {
    //* Propiedades
    obra,

    //* Metodos
    handleSaveLiquidacion,
    setMaterialesSeleccionados,
  };
};
