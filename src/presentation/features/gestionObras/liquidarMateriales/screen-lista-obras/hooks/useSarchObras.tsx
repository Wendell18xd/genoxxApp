import {useQuery} from '@tanstack/react-query';
import * as Yup from 'yup';
import {
  listadoObrasAsiganadas,
  listadoProyectosObras,
} from '../../../../../../actions/obras/obras';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {mapToDropdown} from '../../../../../../infrastructure/mappers/mapToDropdown';
import {Option} from 'react-native-paper-dropdown';
import {useRef} from 'react';
import {ObrasRequest} from '../../../../../../infrastructure/interfaces/gestionObras/liquiMateObra.request';

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
  } = useQuery({
    queryKey: ['proyectos', 'obras'],
    queryFn: async () => {
      const {datos} = await listadoProyectosObras({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_proy_tipo: 'OBRAS',
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

  return {
    //* Propiedades
    tiposBusqueda,
    initialValues,
    proyectos,
    isFetchProyecto,
    obras,
    isFetchObras,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchProyectos,
  };
};
