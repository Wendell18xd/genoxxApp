import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NoticiasStackParam} from '../navigations/NoticiasStackNatigation';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../../../../../components/ui/FadeInImage';
import {Text} from 'react-native-paper';

export const DetalleNoticiaScreen = () => {
  const {noticia} =
    useRoute<RouteProp<NoticiasStackParam, 'DetalleNoticiaScreen'>>().params;

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

        {/* Titulo */}
        <Text style={{marginTop: 8}} variant="titleMedium">
          {noticia.nombre}
        </Text>

        {/* Descripción */}
        <Text style={{marginTop: 4}} variant="bodySmall">
          {noticia.descripcion}
        </Text>
      </ScrollView>
    </SafeAreaLayout>
  );
};
