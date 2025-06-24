import {NavigationProp, useNavigation} from '@react-navigation/native';

import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import {useActividadPartidaStore} from '../store/useActividadPartidaStore';
import {getActividadesPartidas} from '../../../../../actions/buscadores/partidaActividades';
import {ActividadesPartidasObrasRequest} from '../../../../../infrastructure/interfaces/buscadores/partida-actividades/partidas.actividades.request';
import {ActividadPartida} from '../../../../../domain/entities/ActividadPartida';
import { LiquidacionObrasStackParam } from '../../../gestionObras/navigations/LiquidacionObrasStackNavigation';

interface SearchActividadFormValues {
  txt_buscar: string;
}

const initialValues: SearchActividadFormValues = {
  txt_buscar: '',
};

export const useSearchActividad = () => {
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const {onSelect, initialValues: actividadValues} =
    useActividadPartidaStore();

  const filtrosRef = useRef<ActividadesPartidasObrasRequest>({
    vg_empr_codigo: user?.empr_codigo || '',
    vl_part_negocio: actividadValues?.vl_part_negocio || '',
    vl_buscar_tabla: '',
    vl_regi_codigo: actividadValues?.vl_regi_codigo || '',
    vl_tipo: actividadValues?.vl_tipo || '',
    vl_zona: actividadValues?.vl_zona || '',
    vl_part_tipo: actividadValues?.vl_part_tipo || '',
    vl_part_clase: actividadValues?.vl_part_clase || '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      // txt_buscar: Yup.string().required('Buscar personal'),
    });

  const {
    data: actividadPartida,
    isFetching: isFetchActividadPartida,
    refetch: refetchActividadPartida,
    error: errorActividadPartida,
  } = useQuery({
    queryKey: ['consultaActividadPartida'],
    queryFn: async () => {
      const {datos} = await getActividadesPartidas(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (values: SearchActividadFormValues) => {
    const nuevosFiltros: ActividadesPartidasObrasRequest = {
      ...filtrosRef.current,
      vl_buscar_tabla: values.txt_buscar.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchActividadPartida();
  };

  const handleSelectActividadPartida = (
    selectedActividadPartida: ActividadPartida,
  ) => {
    onSelect?.(selectedActividadPartida);
    navigation.goBack();
  };

  return {
    //* Propiedades
    initialValues,
    actividadPartida,
    isFetchActividadPartida,
    errorActividadPartida,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchActividadPartida,
    handleSelectActividadPartida,
  };
};
