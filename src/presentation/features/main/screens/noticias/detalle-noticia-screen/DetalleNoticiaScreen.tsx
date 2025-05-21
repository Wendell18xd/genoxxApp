import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NoticiasStackParam} from '../navigations/NoticiasStackNatigation';
import {useTheme} from 'react-native-paper';
import {useMutation, useQuery} from '@tanstack/react-query';
import {listadoArchivosNoticia} from '../../../../../../actions/main/main';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {RegistroDesdeNoticia} from '../../../../../../domain/entities/Noticia';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {FlatList, View} from 'react-native';
import {DetalleHeaderNoticias} from './components/DetalleHeaderNoticias';
import {ItemArchivoNoticia} from './components/ItemArchivoNoticia';
import Toast from 'react-native-toast-message';

export const DetalleNoticiaScreen = () => {
  const {noticia, onLeido} =
    useRoute<RouteProp<NoticiasStackParam, 'DetalleNoticiaScreen'>>().params;
  const {user} = useAuthStore();
  const {colors} = useTheme();
  const navigation = useNavigation();

  const {data: detalle, isLoading} = useQuery({
    queryKey: ['archivosNoticia', noticia.cont_correlativo],
    queryFn: () =>
      listadoArchivosNoticia({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_cont_correlativo: noticia.cont_correlativo,
        vl_is_visto: noticia.is_visto,
        vl_registro_desde: RegistroDesdeNoticia.App,
      }),
  });

  const mutation = useMutation({
    mutationFn: listadoArchivosNoticia,
    onSuccess: data => {
      console.log(data);
      Toast.show({
        type: 'success',
        text1: 'Noticia marcada como leída',
        text2: 'La noticia se ha marcado como leída correctamente',
      });
      onLeido();
      navigation.goBack();
    },
    onError: error => {
      Toast.show({type: 'error', text1: error.message});
    },
  });

  const handleMarcarLeido = () => {
    mutation.mutate({
      vl_empr_codigo: user?.empr_codigo || '',
      vl_trab_codigo: user?.usua_perfil || '',
      vl_cont_correlativo: noticia.cont_correlativo,
      vl_is_visto: 1,
      vl_registro_desde: RegistroDesdeNoticia.App,
    });
  };

  return (
    <SafeAreaLayout title="Detalle de Noticia" isHeader primary>
      {(isLoading || mutation.isPending) && <FullScreenLoader transparent />}
      <FlatList
        data={detalle?.archivos}
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
              vistas={detalle?.vistas || []}
            />
          </View>
        }
      />

      {noticia.is_visto === 0 && (
        <CustomFAB
          icon="check"
          color={colors.secondary}
          label="Marcar leído"
          onPress={handleMarcarLeido}
          style={{
            margin: 16,
          }}
          loading={mutation.isPending}
        />
      )}
    </SafeAreaLayout>
  );
};
