import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useMainStore} from '../../../../../store/main/useMainStore';
import {Menu} from '../../../../../../types/menus';
import {sanitizarDecimalInput} from '../../../../../helper/inputUtils';
import {MateStockObra} from '../../../../../../infrastructure/interfaces/gestionObras/liquidarMateriales/listarStockObras.response';
import {ToastNativo} from '../../../../../helper/utils';
import {useState} from 'react';
import { useObrasStore } from '../../../store/useObrasStore';

interface Props {
  item: MateStockObra;
}

export const useItemStockMateObras = ({item}: Props) => {
  const {user} = useAuthStore();
  const {obra} = useObrasStore();
  const {drawerKey} = useMainStore();
  const [vermas, setVermas] = useState(false);
  const tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ? 'ENERGIA' : '';

  const handleChangeCantidad = (
    text: string,
    setFieldValue: (field: string, value: any) => void,
    index: number,
  ) => {
    let valorLimpio = sanitizarDecimalInput(text, 2); // hasta 2 decimales

    if (parseFloat(valorLimpio) > parseFloat(item.mate_cantidad.toString())) {
      ToastNativo({
        mensaje: 'La cantidad ingresada no puede ser mayor al stock',
        titulo: 'Error',
      });
      valorLimpio = '';
    }

    if (tipo === 'ENERGIA') {
      if (obra?.valida_proyectado === '1') {
        if (parseFloat(valorLimpio) > parseFloat(item.mate_saldo.toString())) {
          ToastNativo({
            mensaje: 'La cantidad ingresada no puede ser mayor al saldo',
            titulo: 'Error',
          });
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
    vermas,

    //* Metodos
    handleChangeCantidad,
    setVermas,
  };
};
