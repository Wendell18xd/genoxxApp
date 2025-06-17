import * as Yup from 'yup';
import {useEjecucionObrasStore} from '../../../store/useEjecucionObrasStore';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useCronometroStore} from '../../../../../../store/useCronometroStore';
import {formatTiempo} from '../../../../../../helper/timeUtils';
import {SaveActividadSinOrden} from '../../../../../../../domain/entities/SaveActividadSinOrden';
import {
  insertSaveActividadSinObraDB,
  listAllSaveActividadSinObraDB,
} from '../../../../../../services/database/tablas/SaveActividadSinOrdenTabla';
import {useEffect, useState} from 'react';
import {ToastNativo} from '../../../../../../helper/utils';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

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
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [saveActividad, setSaveActividad] = useState<SaveActividadSinOrden[]>(
    [],
  );
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    setLoading(true);
    listAllSaveActividadSinObraDB().then(data => {
      setSaveActividad(data);
      if (data.length > 0) {
        const {...onlyFormFields} = data[0];
        setFormValues(onlyFormFields);
      }
      setLoading(false);
    });
  }, []);

  const getValidationSchema = (actividadDB: SaveActividadSinOrden[]) =>
    Yup.object().shape({
      turno: Yup.string().required('Seleccione el turno'),
      actividad: Yup.string().required('Seleccione una actividad'),
      hora_inicio: Yup.string().required('Seleccione la hora de inicio'),
      hora_final: Yup.string().when([], {
        is: () => actividadDB.length > 0,
        then: schema => schema.required('Seleccione la hora de fin'),
        otherwise: schema => schema.notRequired(),
      }),
    });

  const handleSave = async (values: typeof initialValues) => {
    setSaving(true);
    try {
      const isInicio = (await listAllSaveActividadSinObraDB()).length === 0;

      if (isInicio) {
        const insert: SaveActividadSinOrden = {
          actividad: values.actividad,
          hora_inicio: values.hora_inicio,
          hora_final: values.hora_final,
          situacion: values.situacion,
          observacion: values.observacion,
          turno: values.turno,
          tiempo_transcurrido: formatTiempo(tiempo),
        };
        await insertSaveActividadSinObraDB(insert);
        Toast.show({
          type: 'success',
          text1: 'Actividad guardada',
          text2: 'La actividad se ha guardado correctamente.',
        });
        navigation.goBack();
      } else {
        // Grabar hora final y enviar al servidor
        console.log(values);
      }
    } catch (error) {
      ToastNativo({
        titulo: 'Error al guardar la actividad',
        mensaje: 'Ocurrió un error al intentar guardar la actividad sin obra.',
      });
      console.error('Error al guardar la actividad sin obra:', error);
    } finally {
      setSaving(false);
    }
  };

  return {
    //* Propiedades
    initialValues: formValues,
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
    saving,
    saveActividad,
    loading,

    //* Metodos
    handleSave,
    getValidationSchema,
    start,
    reset,
  };
};
