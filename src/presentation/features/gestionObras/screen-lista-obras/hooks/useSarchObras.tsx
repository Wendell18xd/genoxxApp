import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useRef} from 'react';
import {Option} from 'react-native-paper-dropdown';
import {
  listadoProyectosObras,
  listadoObrasAsiganadas,
} from '../../../../../actions/obras/obras';
import {Obra} from '../../../../../domain/entities/Obra';
import {ObrasRequest} from '../../../../../infrastructure/interfaces/obras/liquidar-materiales/liquiMateObra.request';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {useMainStore} from '../../../../store/main/useMainStore';
import {LiquiMatObrasStackParam} from '../../liquidarMateriales/navigation/LiquiMatObrasStackNavigation';
import { Menu } from '../../../../../types/menus';
import * as Yup from 'yup';
import { useObrasStore } from '../../store/useObrasStore';

interface SearchObrasFormValues {
  cbo_proy_codigo: string;
  cbo_tipo: string;
  txt_busqueda: string;
}

const initialValues: SearchObrasFormValues = {
  cbo_proy_codigo: '',
  cbo_tipo: 'ORDN',
  txt_busqueda: '',
};

const tiposBusqueda: Option[] = [
  {
    label: 'Nro Orden',
    value: 'ORDN',
  },
  {
    label: 'Cubicador',
    value: 'OREF',
  },
  {
    label: 'Nro Interno',
    value: 'NINT',
  },
  {
    label: 'Cod Registro',
    value: 'CREG',
  },
  {
    label: 'Nombre Obra',
    value: 'NOMB',
  },
];

export const useSarchObras = () => {
  const {user} = useAuthStore();
  const {drawerKey} = useMainStore();
  const {setObra} = useObrasStore();
  const navigation = useNavigation<NavigationProp<LiquiMatObrasStackParam>>();

  const proy_tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA
      ? 'ENERGIA'
      : 'OBRAS';

  const filtrosRef = useRef<ObrasRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    cbo_tipo_buscar_doc: 'ORDN',
    txt_nro_buscar_doc: '',
    txt_proy_codigo: '',
    txt_codi_ejecuta: user?.usua_perfil || '',
    txt_cod_negocio: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      cbo_proy_codigo: Yup.string().required('Seleccione un proyecto'),
    });

  const {
    data: proyectos,
    isFetching: isFetchProyecto,
    refetch: refetchProyectos,
    error: errorProyectos,
  } = useQuery({
    queryKey: ['proyectos', 'liquidacion', 'materiales'],
    queryFn: async () => {
      const {datos} = await listadoProyectosObras({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_proy_tipo: proy_tipo,
      });
      const options = mapToDropdown(datos, 'proy_alias', 'proy_codigo');
      return options;
    },
    enabled: false,
  });

  const {
    data: obras,
    isFetching: isFetchObras,
    refetch: refetchObras,
    error: errorObras,
  } = useQuery({
    queryKey: ['obrasAsignadas'],
    queryFn: async () => {
      const {datos} = await listadoObrasAsiganadas(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchObrasFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ObrasRequest = {
      ...filtrosRef.current,
      cbo_tipo_buscar_doc: values.cbo_tipo,
      txt_nro_buscar_doc: values.txt_busqueda,
      txt_proy_codigo: values.cbo_proy_codigo,
    };
    filtrosRef.current = nuevosFiltros;
    refetchObras();
    onClose?.();
  };

  const handleSelectObra = (obra: Obra) => {
    setObra(obra);
    navigation.navigate('SegmentedButtonsDetalleObras');
  };

  return {
    //* Propiedades
    tiposBusqueda,
    initialValues,
    proyectos,
    isFetchProyecto,
    errorProyectos,
    obras,
    isFetchObras,
    errorObras,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchProyectos,
    refetchObras,
    handleSelectObra,
  };
};
