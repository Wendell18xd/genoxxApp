import {Linking, StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import {ArrHijo} from '../../../../../../domain/entities/VerDocumentos';
import {formatearFecha} from '../../../../../helper/timeUtils';

interface Props {
  consulta: ArrHijo;
}

export const ItemDocumento = ({consulta}: Props) => {
  const {colors} = useTheme();

  const iconosPorExtension: Record<string, string> = {
    pdf: 'file-pdf-box',
    doc: 'file-word-box',
    docx: 'file-word-box',
    xls: 'file-excel-box',
    xlsx: 'file-excel-box',
    png: 'file-image',
    jpg: 'file-image',
    jpeg: 'file-image',
    img: 'file-image',
    default: 'file-document-outline',
  };

  const obtenerExtension = (url: string): string => {
    const partes = url.split('.');
    return partes.length > 1 ? partes.pop()!.toLowerCase() : 'default';
  };

  const fechaFormateada = formatearFecha(consulta.fecha_vencimiento);
  const sinFecha = fechaFormateada === '';

  return (
    <>
      <CustomCardContent
        onPress={() => {
          Linking.openURL(consulta.nom_archivo);
        }}
        mode="outlined">
        <View style={styles.container}>
          {/* ICONO */}
          <MaterialIcons
            name={
              iconosPorExtension[obtenerExtension(consulta.nom_archivo)] ??
              iconosPorExtension.default
            }
            size={28}
            color={colors.primary}
          />

          {/* CONTENIDO PRINCIPAL */}
          <View
            style={[
              styles.content,
              sinFecha && {justifyContent: 'center', flex: 1},
            ]}>
            <Text
              variant="titleMedium"
              style={[styles.title, sinFecha && {textAlignVertical: 'center'}]}>
              {consulta.nom_documento}
            </Text>

            {!sinFecha && (
              <Text variant="bodySmall" style={styles.subtitle}>
                {fechaFormateada}
              </Text>
            )}
          </View>

          {/* FLECHA */}
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor={colors.primary}
          />
        </View>
      </CustomCardContent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
    position: 'relative',
    paddingVertical: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  gpsContainer: {
    position: 'absolute',
    right: 0,
    top: -17,
  },
});
