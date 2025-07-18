import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {VerDocumentosStackParam} from '../../navigations/verDocumentosStackNavigation';
import {VerDocumentosRequest} from '../../../../../../infrastructure/interfaces/prevencion/verDocumentos/verDocumentos.request';
import {getListarDocumentos} from '../../../../../../actions/prevencion/verDocumentos';
import * as Yup from 'yup';
import {usePersonalStore} from '../../../../buscadores/buscadorPersonal/store/usePersonalStore';
import {Dato} from '../../../../../../domain/entities/VerDocumentos';

interface SearchDocumentosFormValues {
  txt_cod_trabajador: string;
  personal: string;
}

const initialValues: SearchDocumentosFormValues = {
  txt_cod_trabajador: '',
  personal: '',
};

export const useSearchDocumentos = () => {
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<VerDocumentosStackParam>>();
  const {setOnSelectPersonal, resetPersonal} = usePersonalStore();

  const filtrosRef = useRef<VerDocumentosRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_cod_trabajador: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_cod_trabajador: Yup.string().required('Seleccione en el buscador'),
    });

  const {
    data: consulta,
    isFetching: isFetchConsulta,
    refetch: refetchConsulta,
    error: errorConsulta,
  } = useQuery<Dato[]>({
    queryKey: ['verDocumentos'],
    queryFn: async () => {
      const {datos} = await getListarDocumentos(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchDocumentosFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: VerDocumentosRequest = {
      ...filtrosRef.current,
      txt_cod_trabajador: values.txt_cod_trabajador.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchConsulta();
    onClose?.();
  };

  const handleSelectPersonal = (
    personal: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (personal && personal.length > 0) {
      setFieldValue('personal', '');
      setFieldValue('txt_cod_trabajador', '');
      resetPersonal();
    } else {
      setOnSelectPersonal(item => {
        setFieldValue('personal', `${item.cod_para} - ${item.nom_para}`);
        setFieldValue('txt_cod_trabajador', `${item.cod_para}`);
      });
      navigation.navigate('BuscadorPersonalScreen');
    }
  };

  // const handleSelectDocumento = (url: string) => {
  //   navigation.navigate('WebViewerDocumentoScreen', {
  //     url,
  //   });
  // };

  return {
    //* Propiedades
    initialValues,
    consulta,
    isFetchConsulta,
    errorConsulta,

    //* Metodos
    handleSearch,
    refetchConsulta,
    getValidationSchema,
    handleSelectPersonal,
    // handleSelectDocumento,
  };
};
