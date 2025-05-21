import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NoticiasStackParam} from '../navigations/NoticiasStackNatigation';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {FlatList, View} from 'react-native';
import {DetalleHeaderNoticias} from './components/DetalleHeaderNoticias';
import {ItemArchivoNoticia} from './components/ItemArchivoNoticia';
import {useDetalleNoticia} from './hooks/useDetalleNoticia';
import {useTheme} from 'react-native-paper';

export const DetalleNoticiaScreen = () => {
  const {noticia, onLeido} =
    useRoute<RouteProp<NoticiasStackParam, 'DetalleNoticiaScreen'>>().params;
  const {colors} = useTheme();
  const {detalle, isLoading, handleMarcarLeido, mutation} = useDetalleNoticia({
    noticia,
    onLeido,
  });

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
