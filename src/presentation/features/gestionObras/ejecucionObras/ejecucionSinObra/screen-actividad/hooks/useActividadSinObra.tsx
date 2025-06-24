import * as Yup from 'yup';
import {useEjecucionObrasStore} from '../../../store/useEjecucionObrasStore';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useCronometroStore} from '../../../../../../store/useCronometroStore';
import {formatTiempo} from '../../../../../../helper/timeUtils';
import {SaveActividadSinOrden} from '../../../../../../../domain/entities/SaveActividadSinOrden';
import {
  deleteAllSaveActividadSinObraDB,
  insertSaveActividadSinObraDB,
  listAllSaveActividadSinObraDB,
} from '../../../../../../services/database/tablas/SaveActividadSinOrdenTabla';
import {useEffect, useState} from 'react';
import {ToastNativo} from '../../../../../../helper/utils';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {saveEjecucionSinObras} from '../../../../../../../actions/gestionObras/ejecucion.obras';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {useLocationStore} from '../../../../../../store/location/useLocationStore';
import {Actividade} from '../../../../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

const initialValues = {
  turno: '',
  actividad: '',
  hora_inicio: '',
  hora_final: '',
  situacion: '',
  observacion: '',
};

export const useActividadSinObra = () => {
  const {actividades, setIsSaveActividad} = useEjecucionObrasStore();
  const {user} = useAuthStore();
  const {tiempo, start, reset} = useCronometroStore();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveActividad, setSaveActividad] = useState<SaveActividadSinOrden[]>(
    [],
  );
  const [formValues, setFormValues] = useState(initialValues);
  const {getLocation} = useLocationStore();
  const [selectActividad, setSelectActividad] = useState<Actividade>();

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

  const handleActividadChange = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
    val: string | undefined,
  ) => {
    setFieldValue('actividad', val);
    const findActividad = actividades?.actividades.find(
      actividad => actividad.cont_parametro === val,
    );
    console.log(findActividad);
    setSelectActividad(findActividad);
  };

  const handleSave = async (values: typeof initialValues) => {
    try {
      const isInicio = (await listAllSaveActividadSinObraDB()).length === 0;

      if (isInicio) {
        setSaving(true);
        const insert: SaveActividadSinOrden = {
          actividad: values.actividad,
          hora_inicio: values.hora_inicio,
          hora_final: values.hora_final,
          situacion: values.situacion,
          observacion: values.observacion,
          turno: values.turno,
          tiempo_transcurrido: formatTiempo(tiempo),
          registro_fecha: new Date().toISOString(),
        };
        await insertSaveActividadSinObraDB(insert);
        Toast.show({
          type: 'success',
          text1: 'Actividad guardada',
          text2: 'La actividad se ha guardado correctamente.',
        });
        setIsSaveActividad(true);
        navigation.goBack();
      } else {
        try {
          setIsSaving(true);
          const location = await getLocation();

          if (!location) {
            setIsSaving(false);
            return;
          }

          const actividadInicio = await listAllSaveActividadSinObraDB();
          const {tiempo_transcurrido, registro_fecha} =
            actividadInicio[0] || {};
          mutation.mutate(
            {
              vg_empr_codigo: user?.empr_codigo || '',
              vg_empr_pais: user?.empr_pais || '',
              vg_usua_perfil: user?.usua_perfil || '',
              txt_actividad: values.actividad,
              txt_hora_inicio: values.hora_inicio,
              txt_hora_fin: values.hora_final,
              txt_situacion: values.situacion,
              txt_comentario: values.observacion,
              vl_turno: values.turno,
              vl_transcurrido_fin: formatTiempo(tiempo),
              vl_transcurrido_inicio: tiempo_transcurrido,
              vl_coord_x: location.latitude.toString() || '',
              vl_coord_y: location.longitude.toString() || '',
              vl_registro_fecha_inicio: registro_fecha,
              vl_automatico: '',
              txt_fecha: '',
            },
            {
              onSettled: () => setIsSaving(false),
            },
          );
        } catch (error) {
          console.error(error);
          setIsSaving(false);
        }
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

  const mutation = useMutation({
    mutationFn: saveEjecucionSinObras,
    onSuccess: async data => {
      const {estado} = data;

      if (estado === 1) {
        await deleteAllSaveActividadSinObraDB();
        setIsSaveActividad(true);
        Toast.show({
          type: 'success',
          text1: 'Actividad finalizada',
          text2: 'Actividad finalizada correctamente.',
        });
        navigation.goBack();
      } else if (estado === 2) {
        Toast.show({
          type: 'error',
          text1: 'Solo se puede enviar esta actividad una vez al dia',
        });
      } else if (estado === 3) {
        Toast.show({
          type: 'error',
          text1: 'Solo se puede enviar esta actividad un minuto despues',
        });
      } else if (estado === 5) {
        Toast.show({
          type: 'error',
          text1:
            'La hora inicio es menor a la hora final de tu actividad anterior',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al finalizar la actividad',
        });
      }
    },
    onError: error => {
      ToastNativo({
        titulo: 'Error al guardar la actividad',
        mensaje: 'Ocurrió un error al intentar guardar la actividad sin obra.',
      });
      console.error('Error al guardar la actividad sin obra:', error);
    },
  });

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
    isSaving,
    selectActividad,

    //* Metodos
    handleSave,
    getValidationSchema,
    start,
    reset,
    handleActividadChange,
  };
};
