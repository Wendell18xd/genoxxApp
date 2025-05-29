import {useState} from 'react';
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
  const {obra, materialesSeleccionados, setMaterialesSeleccionados} =
    useLiquiMateStore();
  const [cantidad, setCantidad] = useState('');
  const [observacion, setObservacion] = useState('');
  const {drawerKey} = useMainStore();
  const tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ? 'ENERGIA' : '';

  const handleChangeCantidad = (text: string) => {
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

    //TODO Validar el tope liquidaciones
    setCantidad(valorLimpio);
    // handleSaveMaterial(valorLimpio, observacion);
  };

  const handleChangeObservacion = (text: string) => {
    setObservacion(text);
    // handleSaveMaterial(cantidad, text);
  };

  const handleSaveMaterial = (vl_cantidad: string, vl_observacion: string) => {
    const valorLimpio = sanitizarDecimalInput(
      vl_cantidad === '' ? '0' : vl_cantidad,
      2,
    ).trim();
    const clave = `${item.guia_codigo}-${item.guia_numero}-${item.mate_codigo}`;

    const nuevoArray = [
      ...materialesSeleccionados.filter(
        m =>
          `${m.vl_guia_codigo}-${m.vl_guia_numero}-${m.vl_mate_codigo}` !==
          clave,
      ),
      {
        vl_guia_codigo: item.guia_codigo,
        vl_guia_numero: item.guia_numero,
        vl_mate_codigo: item.mate_codigo,
        vl_mate_cantidad: parseFloat(valorLimpio),
        vl_mate_observacion: vl_observacion.trim(),
      },
    ];

    setMaterialesSeleccionados(nuevoArray);
  };

  return {
    //* Propiedades
    user,
    obra,
    materialesSeleccionados,
    cantidad,
    observacion,

    //* Metodos
    handleChangeCantidad,
    handleChangeObservacion,
    handleSaveMaterial,
  };
};
