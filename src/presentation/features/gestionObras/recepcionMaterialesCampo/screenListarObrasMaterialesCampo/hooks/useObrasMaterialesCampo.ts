import {useRef} from 'react';
import {Obra} from '../../../../../../domain/entities/Obra';
import {ObrasRequest} from '../../../../../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.request';
import {useBottomSheetModal} from '../../../../../hooks/useBottomSheet';
import {useObrasStore} from '../../../store/useObrasStore';
import * as Yup from 'yup';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useQuery} from '@tanstack/react-query';
import {listadoObrasAsiganadas} from '../../../../../../actions/gestionObras/obras';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RecepcionMateCampoStackParam} from '../../navigations/RecepcionMateCampoStackNavigation';

const initialValues = {
  nro_orden: '',
};

export const useObrasMaterialesCampo = () => {
  const {user} = useAuthStore();
  const {isRefresthObra, setObra} = useObrasStore();
  const {ref, open, close} = useBottomSheetModal();
  const navigation =
    useNavigation<
      NavigationProp<
        RecepcionMateCampoStackParam,
        'ListarObrasMaterialesCampoScreen'
      >
    >();

  const filtrosRef = useRef<ObrasRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    cbo_tipo_buscar_doc: 'ORDN',
    txt_nro_buscar_doc: '',
    txt_proy_codigo: '',
    txt_codi_ejecuta: user?.usua_perfil || '',
    txt_cod_negocio: '',
    vl_opcion: 'OBRAS',
  });

  const {
    data: obras,
    isFetching: isFetchObras,
    refetch: refetchObras,
    error: errorObras,
  } = useQuery({
    queryKey: ['obrasAsignadasMateCampo'],
    queryFn: async () => {
      const {datos} = await listadoObrasAsiganadas(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      nro_orden: Yup.string().required('Ingrese el nro de orden'),
    });

  const handleSearch = async (
    values?: typeof initialValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ObrasRequest = {
      ...filtrosRef.current,
      txt_nro_buscar_doc: values?.nro_orden || '',
    };
    filtrosRef.current = nuevosFiltros;
    refetchObras();
    onClose?.();
  };

  const handleSelectObra = async (obra: Obra) => {
    setObra(obra);
    navigation.navigate('SegmentedButtonsMatesCampo');
  };

  const handleOpenSearch = () => {
    open();
  };

  return {
    //* Propiedades
    ref,
    isRefresthObra,
    initialValues,
    open,
    close,
    obras,
    isFetchObras,
    errorObras,

    //* Metodos
    handleSearch,
    refetchObras,
    handleSelectObra,
    handleOpenSearch,
    getValidationSchema,
  };
};
