import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {Option} from 'react-native-paper-dropdown';
import {
  listadoProyectosObras,
  listadoObrasAsiganadas,
} from '../../../../../actions/gestionObras/obras';
import {Obra} from '../../../../../domain/entities/Obra';
import {ObrasRequest} from '../../../../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.request';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {useMainStore} from '../../../../store/main/useMainStore';
import {LiquidacionObrasStackParam} from '../../navigations/LiquidacionObrasStackNavigation';
import {Menu} from '../../../../../types/menus';
import * as Yup from 'yup';
import {useObrasStore} from '../../store/useObrasStore';
import {useObrasNavigationStore} from '../../store/useObrasNavigationStore';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import {useEjecucionObrasStore} from '../../ejecucionObras/store/useEjecucionObrasStore';
import {
  eliminarTodasLasObras,
  insertObra,
  listarObrasDB,
} from '../../../../services/database/tablas/ObrasTabla';
import {format} from 'date-fns';
import {checkInternet} from '../../../../helper/network';

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
  const {isRefresthObra, setObra} = useObrasStore();
  const {opcionSeleccionada, seleccionarOpcion} = useObrasNavigationStore();
  const {ref, open, close} = useBottomSheetModal();
  const {loading: loadingActividades, getActividadesObras} =
    useEjecucionObrasStore();
  const navigation =
    useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const [obrasDB, setObrasDB] = useState<Obra[]>([]);
  const [loadingDB, setLoadingDB] = useState(false);

  const proy_tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ||
    drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA
      ? 'ENERGIA'
      : 'OBRAS';

  const filtrosRef = useRef<ObrasRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    cbo_tipo_buscar_doc: 'ORDN',
    txt_nro_buscar_doc: '',
    txt_proy_codigo: '',
    txt_codi_ejecuta: user?.usua_perfil || '',
    txt_cod_negocio: '',
    vl_opcion: '',
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
    data: obrasuQ,
    isFetching: isFetchObras,
    refetch: refetchObras,
    error: errorObras,
  } = useQuery({
    queryKey: ['obrasAsignadas'],
    queryFn: async () => {
      const {datos} = await listadoObrasAsiganadas(filtrosRef.current);

      if (opcionSeleccionada === 'ejecutar') {
        setLoadingDB(true);
        await eliminarTodasLasObras();
        await Promise.all(datos.map(obra => insertObra(obra)));
        await listarObrasDb();
        setLoadingDB(false);
      }

      return datos;
    },
    enabled: false,
  });

  const handleSearch = async (
    values?: SearchObrasFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ObrasRequest = {
      ...filtrosRef.current,
      cbo_tipo_buscar_doc: values?.cbo_tipo || '',
      txt_nro_buscar_doc: values?.txt_busqueda || '',
      txt_proy_codigo: values?.cbo_proy_codigo || '',
      vl_opcion: opcionSeleccionada || '',
    };
    filtrosRef.current = nuevosFiltros;

    setLoadingDB(true);
    const tieneInternet = await checkInternet();

    if (opcionSeleccionada === 'ejecutar' && !tieneInternet) {
      await listarObrasDb();
      setLoadingDB(false);
    } else {
      refetchObras();
    }
    onClose?.();
  };

  const listarObrasDb = async () => {
    const fechaHoy = format(new Date(), 'yyyy-MM-dd');
    const obras = await listarObrasDB('fecha_asignacion = ?', [fechaHoy]);
    setObrasDB(obras);
  };

  const handleSelectObra = async (obra: Obra) => {
    setObra(obra);
    if (opcionSeleccionada === 'liquidar') {
      navigation.navigate('SegmentedButtonsDetalleObras');
    }
    if (opcionSeleccionada === 'ejecutar') {
      await getActividadesObras({
        vg_empr_pais: user?.empr_pais || '',
      });
      navigation.navigate('SegmentedButtonsEjecucionObras');
    }
  };

  const handleOpenSearch = () => {
    if (opcionSeleccionada === 'ejecutar') {
      seleccionarOpcion('menu');
    }
    open();
  };

  const onRefetchObras = () => {
    filtrosRef.current = {
      ...filtrosRef.current,
      vl_opcion: opcionSeleccionada || '',
    };
    refetchObras();
  };

  return {
    //* Propiedades
    tiposBusqueda,
    initialValues,
    proyectos,
    isFetchProyecto,
    errorProyectos,
    obras: opcionSeleccionada === 'ejecutar' ? obrasDB : obrasuQ,
    isFetchObras: opcionSeleccionada === 'ejecutar' ? loadingDB : isFetchObras,
    errorObras,
    opcionSeleccionada,
    ref,
    loadingActividades,
    isRefresthObra,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchProyectos,
    refetchObras: onRefetchObras,
    handleSelectObra,
    close,
    handleOpenSearch,
  };
};
