import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {
  listarFotosMaterialesObras,
  grabarFotosMaterialesObras,
  grabarFotosPartidasObras,
} from '../../../../../actions/gestionObras/fotos.obras';
import {Foto} from '../../../../../domain/entities/Foto';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {useFotosStore} from '../../../foto/store/useFotosStore';
import {LiquidacionObrasStackParam} from '../../navigations/LiquidacionObrasStackNavigation';
import {useObrasStore} from '../../store/useObrasStore';
import {useLocationStore} from '../../../../store/location/useLocationStore';
import {validarGpsActivo} from '../../../../helper/checkGPS';

export const useFotosMaterialesObras = (opcion: string) => {
  const navigation =
    useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const {setInitialParams} = useFotosStore();
  const {user} = useAuthStore();
  const {obra} = useObrasStore();
  const {getLocation} = useLocationStore();

  const {
    data: datosFotos,
    isFetching: isFetchingFotos,
    refetch: refetchFotos,
    error: errorFotos,
  } = useQuery({
    queryKey: ['fotosMaterialesObra', obra],
    queryFn: async () => {
      const {datos: fotos} = await listarFotosMaterialesObras({
        vg_empr_codigo: user?.empr_codigo || '',
        vg_usua_codigo: user?.usua_codigo || '',
        vl_tipo_archivo: 'TD05',
        vl_origen_archivo: opcion === 'materiales' ? 'MATE' : 'PART',
        vl_regi_codigo: obra?.regi_codigo || '',
      });

      return fotos;
    },
    enabled: false,
  });

  const fotoMutation = useMutation({
    mutationFn:
      opcion === 'MATE' ? grabarFotosMaterialesObras : grabarFotosPartidasObras,
    onSuccess: data => {
      const {datos: estado, mensaje} = data;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Fotos grabadas correctamente',
        });

        //* Navego hacia atras desde la pantalla de camara
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al grabar fotos',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al grabar fotos',
        text2: error.message,
      });
    },
  });

  //* Navego hacia la pantalla de la camara y defino sus parametros iniciales
  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isComentario: true,
      isSave: true,
      onSave: async (_fotos: Foto[]) => {
        await handleSave(_fotos);
      },
    });
    navigation.navigate('CustomCameraScreen');
  };

  //* Dispara el onSave de la pantalla de la camara
  const handleSave = async (_fotos: Foto[]) => {
    const gpsActivo = await validarGpsActivo();
    if (!gpsActivo) {
      return;
    }
    const location = await getLocation();
    await fotoMutation.mutateAsync({
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      vl_regi_codigo: obra?.regi_codigo || '',
      vl_coord_x: location?.latitude.toString() || '',
      vl_coord_y: location?.longitude.toString() || '',
      vl_tipo_archivo: 'TD05',
      vl_origen_archivo: opcion === 'materiales' ? 'MATE' : 'PART',
      vl_fotos: _fotos.map(foto => foto.foto),
      vl_fotos_comentarios: _fotos.map(foto => foto.comentario),
    });
  };

  return {
    //* Propiedades
    fotoMutation,
    datosFotos,
    isFetchingFotos,
    errorFotos,

    //* Metodos
    handleCamera,
    refetchFotos,
  };
};
