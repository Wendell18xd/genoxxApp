import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NoticiasStackParam} from '../navigations/NoticiasStackNatigation';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../../../../../components/ui/FadeInImage';
import {Text, useTheme} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {listadoArchivosNoticia} from '../../../../../../actions/main/main';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {RegistroDesdeNoticia} from '../../../../../../domain/entities/Noticia';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useEffect} from 'react';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {View} from 'react-native';
import {globalStyle} from '../../../../../styles/globalStyle';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';

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
    // refetch();
  }, []);

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaLayout title="Detalle de Noticia" isHeader primary>
      <ScrollView
        style={{flex: 1, margin: 16}}
        showsVerticalScrollIndicator={false}>
        {/* Imagen */}
        <FadeInImage
          uri={noticia.ruta_completa}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
          restaPadding={16}
        />

        <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
          {/* Columna de texto */}
          <View style={{flex: 5, marginEnd: 16}}>
            <Text variant="titleMedium">{noticia.nombre}</Text>
            <Text style={{marginTop: 4}} variant="bodySmall">
              {noticia.descripcion}
            </Text>
          </View>

          {/* Contador de vistas */}
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View
              style={[
                globalStyle.bgWarning,
                {
                  flexDirection: 'row',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                  elevation: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <MaterialIcons name="eye" style={{marginEnd: 4}} />
              <Text variant="labelMedium">{data?.vistas.length}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {noticia.is_visto === 0 && (
        <CustomFAB
          icon="check"
          color={colors.secondary}
          label="Marcar leido"
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
