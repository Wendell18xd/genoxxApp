import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {useMainStore} from '../../../../../store/main/useMainStore';
import {Menu} from '../../../../../../types/menus';
import {sanitizarDecimalInput} from '../../../../../helper/inputUtils';
import {MateStockObra} from '../../../../../../infrastructure/interfaces/gestionObras/liquidar-materiales/listarStockObras.response';
import {ToastNativo} from '../../../../../helper/utils';

interface Props {
  item: MateStockObra;
}

export const useItemStockMateObras = ({item}: Props) => {
  const {user} = useAuthStore();
  const {obra} = useLiquiMateStore();
  const {drawerKey} = useMainStore();
  const tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ? 'ENERGIA' : '';

  const handleChangeCantidad = (
    text: string,
    setFieldValue: (field: string, value: any) => void,
    index: number,
  ) => {
    let valorLimpio = sanitizarDecimalInput(text, 2); // hasta 2 decimales

    if (parseFloat(valorLimpio) > parseFloat(item.mate_cantidad.toString())) {
      ToastNativo('La cantidad ingresada no puede ser mayor al stock', 'Error');
      valorLimpio = '';
    }

    if (tipo === 'ENERGIA') {
      if (obra?.valida_proyectado === '1') {
        if (parseFloat(valorLimpio) > parseFloat(item.mate_saldo.toString())) {
          ToastNativo(
            'La cantidad ingresada no puede ser mayor al saldo',
            'Error',
          );
          valorLimpio = '';
        }
      }
    }

    // Finalmente, actualizar el valor en Formik
    setFieldValue(
      `materiales[${index}].vl_mate_cantidad`,
      parseFloat(valorLimpio) || 0,
    );
  };

  return {
    //* Propiedades
    user,
    obra,

    //* Metodos
    handleChangeCantidad,
  };
};
