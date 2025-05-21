import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NoticiasStackParam} from '../navigations/NoticiasStackNatigation';
import {useTheme} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {listadoArchivosNoticia} from '../../../../../../actions/main/main';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {RegistroDesdeNoticia} from '../../../../../../domain/entities/Noticia';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useEffect} from 'react';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {FlatList, View} from 'react-native';
import {DetalleHeaderNoticias} from './components/DetalleHeaderNoticias';
import {ItemArchivoNoticia} from './components/ItemArchivoNoticia';

export const DetalleNoticiaScreen = () => {
  const {noticia} =
    useRoute<RouteProp<NoticiasStackParam, 'DetalleNoticiaScreen'>>().params;
  const {user} = useAuthStore();
  const {colors} = useTheme();

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['archivosNoticia', noticia.cont_correlativo],
    staleTime: 1000 * 60 * 60,
    queryFn: () =>
      listadoArchivosNoticia({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_cont_correlativo: noticia.cont_correlativo,
        vl_is_visto: noticia.is_visto,
        vl_registro_desde: RegistroDesdeNoticia.App,
      }),
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaLayout title="Detalle de Noticia" isHeader primary>
      <FlatList
        data={data?.archivos}
        renderItem={({item}) => (
          <View style={{marginBottom: 16}}>
            <ItemArchivoNoticia item={item} />
          </View>
        )}
        keyExtractor={item => item.cont_correlativo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        ListHeaderComponent={
          <View style={{marginBottom: 16}}>
            <DetalleHeaderNoticias
              noticia={noticia}
              vistas={data?.vistas || []}
            />
          </View>
        }
      />

      {noticia.is_visto === 0 && (
        <CustomFAB
          icon="check"
          color={colors.secondary}
          label="Marcar leído"
          onPress={() => {
            console.log('Marcar visto');
          }}
          style={{
            margin: 16,
          }}
        />
      )}
    </SafeAreaLayout>
  );
};
