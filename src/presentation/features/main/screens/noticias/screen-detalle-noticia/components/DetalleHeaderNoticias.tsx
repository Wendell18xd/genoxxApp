import {Linking, View} from 'react-native';
import {FadeInImage} from '../../../../../../components/ui/FadeInImage';
import {globalStyle} from '../../../../../../styles/globalStyle';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import {Text} from 'react-native-paper';
import {
  Noticia,
  VistaNoticia,
} from '../../../../../../../domain/entities/Noticia';
import PrimaryButton from '../../../../../../components/ui/PrimaryButton';

interface Props {
  noticia: Noticia;
  vistas: VistaNoticia[];
}

export const DetalleHeaderNoticias = ({noticia, vistas}: Props) => {
  return (
    <View style={{flex: 1}}>
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
            <MaterialIcons name="eye" style={{marginEnd: 4, marginStart: 4}} />
            <Text variant="labelMedium">{vistas.length}</Text>
          </View>
        </View>
      </View>

      {noticia.link !== '' && (
        <PrimaryButton
          icon="link"
          height={40}
          style={{marginTop: 16}}
          onPress={() => {
            Linking.openURL(noticia.link);
          }}>
          Abrir enlace
        </PrimaryButton>
      )}
    </View>
  );
};
