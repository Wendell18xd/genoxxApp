import * as Yup from 'yup';
import {useEjecucionObrasStore} from '../../../store/useEjecucionObrasStore';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useCronometroStore} from '../../../../../../store/useCronometroStore';
import {formatTiempo} from '../../../../../../helper/timeUtils';

const initialValues = {
  turno: '',
  actividad: '',
  hora_inicio: '',
  hora_final: '',
  situacion: '',
  observacion: '',
};

export const useActividadSinObra = () => {
  const {actividades} = useEjecucionObrasStore();
  const {tiempo, start, reset} = useCronometroStore();

  const getValidationSchema = () =>
    Yup.object().shape({
      turno: Yup.string().required('Seleccione el turno'),
      actividad: Yup.string().required('Seleccione una actividad'),
      hora_inicio: Yup.string().required('Seleccione la hora de inicio'),
    });

  const handleSave = (values: typeof initialValues) => {
    console.log({...values, tiempo_transcurrido: formatTiempo(tiempo)});
  };

  return {
    //* Propiedades
    initialValues,
    actividades: mapToDropdown(
      actividades?.actividades || [],
      'cont_campo01',
      'cont_parametro',
    ),
    situacion: mapToDropdown(
      actividades?.situacion || [],
      'cont_campo01',
      'cont_parametro',
    ),
    tiempo,

    //* Metodos
    handleSave,
    getValidationSchema,
    start,
    reset,
  };
};
