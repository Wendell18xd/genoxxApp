import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef, useState, useEffect, useCallback} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  getConsultaConductorPlaca,
  getConsultaPlacaConductor,
  saveControlOdometro,
} from '../../../../../../actions/flota/controlOdometro';
import {useFotosStore} from '../../../../foto/store/useFotosStore';
import {useLocationStore} from '../../../../../store/location/useLocationStore';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {ControlOdometroStackParam} from '../../navigations/ControlOdometroStackNavigation';
import Toast from 'react-native-toast-message';
import {ToastNativo} from '../../../../../helper/utils';
import {formatearFecha} from '../../../../../helper/timeUtils';
import {Alert} from 'react-native';
import * as Yup from 'yup';

interface initialParams {
  txt_nro_placa: string;
  prox_mant?: string;
  fecha_prox_mantenimiento?: string;
  dir_coment?: string;
  txt_kilometraje: string;
  txt_comentario: string;
}

const initialValues: initialParams = {
  txt_nro_placa: '',
  prox_mant: '',
  fecha_prox_mantenimiento: '',
  dir_coment: '',
  txt_kilometraje: '',
  txt_comentario: '',
};

export const useFormOdometro = () => {
  const {user} = useAuthStore();

  const navigation = useNavigation<NavigationProp<ControlOdometroStackParam>>();
  const {fotos, setInitialParams, onReset} = useFotosStore();
  const {getLocation} = useLocationStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [formKey, setFormKey] = useState(Date.now());

  const [vehiculoData, setVehiculoData] = useState<any>(null);
  const [conductorData, setConductorData] = useState<any>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const responsePlaca = await getConsultaPlacaConductor({
          vl_empr_codigo: user?.empr_codigo || '',
          txt_codi_perfil: user?.usua_perfil || '',
        });

        const placa = responsePlaca.datos?.[0]?.cod_para || '';
        const vehiculo = responsePlaca.datos?.[0];

        setVehiculoData(vehiculo);
        setInitialFormValues({
          txt_nro_placa: vehiculo?.cod_para || '',
          prox_mant: vehiculo?.prox_mant || '',
          fecha_prox_mantenimiento: vehiculo?.fecha_prox_mantenimiento || '',
          dir_coment: vehiculo?.dir_coment || '',
          txt_kilometraje: '',
          txt_comentario: '',
        });

        const responseConductor = await getConsultaConductorPlaca({
          vl_empr_codigo: user?.empr_codigo || '',
          txt_nro_placa: placa,
        });

        setConductorData(responseConductor.datos?.[0]);
        onReset();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCamera = () => {
    setInitialParams({maxFotos: 3, minFotos: 1});
    navigation.navigate('CustomCameraScreen');
  };

  const mutation = useMutation({
    mutationFn: saveControlOdometro,
    onSuccess: async data => {
      const {datos, mensaje} = data;
      if (datos === 1) {
        Toast.show({type: 'success', text1: 'Se registró correctamente'});
        onReset();
        setInitialFormValues(prev => ({
          ...prev,
          txt_kilometraje: '',
          txt_comentario: '',
        }));
        setFormKey(Date.now());
        // navigation.goBack();
      } else if (datos === 2) {
        Toast.show({
          type: 'error',
          text1: 'El kilometraje es menor al registro anterior',
        });
      } else {
        Toast.show({type: 'error', text1: 'Error al grabar', text2: mensaje});
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al grabar',
        text2: error.message,
      });
    },
  });

  const getValidationSchema = () =>
      Yup.object().shape({
        txt_kilometraje: Yup.string().required('Ingrese el kilometraje'),
        txt_comentario: Yup.string().required('Ingrese un comentario'),
      });

  const handleSave = async (values: initialParams) => {
    const arrFotos = fotos.map(foto => foto.foto);
    if (arrFotos.length < 1) {
      ToastNativo({
        titulo: 'Fotos obligatorias',
        mensaje: 'Debe capturar al menos 1 foto',
      });
      return;
    }

    try {
      setIsSaving(true);
      const location = await getLocation();

      if (!location) {
        setIsSaving(false);
        return;
      }

      mutation.mutate(
        {
          vl_empr_codigo: user?.empr_codigo || '',
          txt_codi_perfil: conductorData?.cod_para || user?.usua_perfil || '',
          placa: values.txt_nro_placa,
          txt_user: user?.usua_nombre || '',
          txt_kilometraje: values?.txt_kilometraje || '',
          txt_comentario: values?.txt_comentario || '',
          vl_coord_x: location?.latitude.toString() || '',
          vl_coord_y: location?.longitude.toString() || '',
          vl_fotos: arrFotos,
        },
        {onSettled: () => setIsSaving(false)},
      );
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  // ----- ALERTAS DE VENCIMIENTO
  const diasVencimiento = (fechaStr: string | null | undefined): number => {
    if (!fechaStr || fechaStr.startsWith('1900')) {
      return Infinity;
    }
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    const diff = fecha.getTime() - hoy.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  const seMostroAlerta = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (seMostroAlerta.current || !vehiculoData) {
        return;
      }
      seMostroAlerta.current = true;

      let cadenaPorVencer = '';
      let cadenaVencio = '';

      // Prox mantenimiento
      if (vehiculoData.prox_mant && vehiculoData.odometro) {
        const proxMant = parseInt(vehiculoData.prox_mant, 10);
        const odometro = parseInt(vehiculoData.odometro, 10);
        const resta = odometro - proxMant;

        if (!isNaN(resta)) {
          if (resta > 0 && resta <= 1000) {
            cadenaPorVencer += `Próximo Mantenimiento: ${proxMant} km\n`;
          } else if (resta > 1000) {
            cadenaVencio += `Próximo Mantenimiento: ${proxMant} km\n`;
          }
        }
      }

      // Fechas
      const revisarFecha = (
        label: string,
        fecha: string | null | undefined,
      ) => {
        const dias = diasVencimiento(fecha);
        if (dias <= 0) {
          cadenaVencio += `${label}: ${formatearFecha(fecha)}\n`;
        } else if (dias <= 30) {
          cadenaPorVencer += `${label}: ${formatearFecha(fecha)}\n`;
        }
      };

      revisarFecha('Revisión Técnica', vehiculoData.fecha_venci_revicion_tec);
      revisarFecha('Emisión de Gases', vehiculoData.fecha_venci_emi_gases);
      revisarFecha('Fecha Prox. Mant.', vehiculoData.fecha_prox_mantenimiento);

      if (cadenaPorVencer || cadenaVencio) {
        const mensaje = `${
          cadenaPorVencer ? `Por vencer:\n${cadenaPorVencer}` : ''
        }${cadenaVencio ? `Vencido:\n${cadenaVencio}` : ''}`;

        Alert.alert('Alertas de Vencimiento', mensaje.trim(), [{text: 'OK'}]);
      }
    }, [vehiculoData]),
  );
  // ----- FIN ALERTAS DE VENCIMIENTO

  return {
    //* Propiedades
    initialValues: initialFormValues,
    formKey,
    conductor: conductorData,
    isSaving,
    isLoadingData,
    cantidadFotos: fotos.length,
    getValidationSchema,

    //* Metodos
    handleSave,
    handleCamera,
  };
};
