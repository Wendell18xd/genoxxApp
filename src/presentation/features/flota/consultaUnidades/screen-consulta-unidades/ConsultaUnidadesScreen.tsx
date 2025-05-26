import {TextInput} from 'react-native-paper';

import {Alert, View} from 'react-native';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {getConsultaUnidades} from '../../../../../actions/flota/consultaUnidades';
import {useEffect, useState} from 'react';
import {ListaConsultaUnidades} from './components/ListaConsultaUnidades';
import {ConsultaUnidades} from '../../../../../domain/entities/ConsultaUnidades';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ConsultaUnidadesStackParam} from '../navigations/ConsultaUnidadesStackNavigation';

export const ConsultaUnidadesScreen = () => {
  const navigation =
    useNavigation<NavigationProp<ConsultaUnidadesStackParam>>();
  const {user} = useAuthStore();
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [resultados, setResultados] = useState<ConsultaUnidades[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setTextoBusqueda('');
      setResultados([]);
    });
    return unsubscribe;
  }, [navigation]);

  const buscarUnidades = async () => {
    setLoading(true);
    try {
      const request = {
        vl_empr_codigo: user?.empr_codigo ?? '',
        txt_nro_placa: textoBusqueda.trim().toUpperCase(),
        cbo_bus_estado: '',
        cbo_tipo_vehiculo: '',
        cbo_bus_proyectos: '',
        cbo_bus_unid_obra: '',
        txt_cod_destinatario: '',
        txt_bus_fechas: '',
      };

      const resp = await getConsultaUnidades(request);
      setResultados(resp.datos);
    } catch (error) {
      Alert.alert('Error', 'Error al consultar las unidades');
    } finally {
      setLoading(false);
    }
  };

  const handleDetalleConsulta = (item: ConsultaUnidades) => {
    navigation.navigate('DetalleConsultaScreen', {consulta: item});
  };

  return (
    <DrawerLayout>
      <View style={{marginTop: 16, marginHorizontal: 32}}>
        <CustomTextInput
          placeholder="Buscar número de placa"
          mode="outlined"
          autoCapitalize="characters"
          value={textoBusqueda}
          onChangeText={setTextoBusqueda}
          left={<TextInput.Icon icon="magnify" />}
        />
        <PrimaryButton
          onPress={buscarUnidades}
          debounce
          disabled={false}
          loading={loading}
          style={{marginTop: 16, width: '100%'}}>
          Buscar
        </PrimaryButton>
      </View>
      {resultados.length > 0 && (
        <View style={{marginTop: 32, marginHorizontal: 16}}>
          <ListaConsultaUnidades
            consulta={resultados}
            onPressItem={handleDetalleConsulta}
          />
        </View>
      )}
    </DrawerLayout>
  );
};
