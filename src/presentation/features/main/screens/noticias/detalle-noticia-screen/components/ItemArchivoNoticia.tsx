import React from 'react';
import {Linking, View} from 'react-native';
import {ArchivoNoticia} from '../../../../../../../domain/entities/Noticia';
import {Card, Text, useTheme, IconButton} from 'react-native-paper';
import {globalStyle} from '../../../../../../styles/globalStyle';

interface Props {
  item: ArchivoNoticia;
}

const getIconByExtension = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'file-pdf-box';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    default:
      return 'file';
  }
};

export const ItemArchivoNoticia = ({item}: Props) => {
  const {colors} = useTheme();
  const icon = getIconByExtension(item.archivo);

  const handlePress = async () => {
    try {
      // Verifica que la ruta sea válida
      if (item.ruta_completa) {
        await Linking.openURL(item.ruta_completa);
      }
    } catch (err) {
      console.warn('Error al abrir archivo:', err);
    }
  };

  return (
    <Card onPress={handlePress} style={[globalStyle.card]}>
      <Card.Content
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}>
        <IconButton icon={icon} iconColor={colors.primary} />
        <View style={{flex: 1}}>
          <Text variant="bodyMedium">{item.comentario}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
