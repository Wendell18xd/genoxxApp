import {StyleSheet, View} from 'react-native';
import {MateStockObra} from '../../../../../../../infrastructure/interfaces/gestionObras/liquidar-materiales/listarStockObras.response';
import {CustomCardContent} from '../../../../../../components/ui/CustomCardContent';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import {Divider, Text, useTheme} from 'react-native-paper';
import {formatearNumero} from '../../../../../../helper/moneyUtils';
import CustomTextInput from '../../../../../../components/ui/CustomTextInput';
import {useItemStockMateObras} from '../../hooks/useItemStockMateObras';
import {useEffect} from 'react';

interface Props {
  item: MateStockObra;
}
export const ItemStockMateObras = ({item}: Props) => {
  const {colors} = useTheme();
  const {
    user,
    obra,
    cantidad,
    observacion,
    materialesSeleccionados,
    handleChangeCantidad,
    handleChangeObservacion,
    handleSaveMaterial,
  } = useItemStockMateObras({item});

  useEffect(() => {
    if (materialesSeleccionados.length === 0) {
      handleChangeCantidad('');
      handleChangeObservacion('');
    }
  }, [materialesSeleccionados]);

  return (
    <CustomCardContent mode="outlined">
      <View style={styles.container}>
        {/* ICONO */}

        <MaterialIcons name="layers" size={28} color={colors.primary} />

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {item.mate_nombre}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {item.mate_codigo}
          </Text>
        </View>

        {/* CANTIDAD */}
        <Text variant="bodyLarge">
          {formatearNumero({
            valor: item.mate_cantidad,
            pais: user?.empr_pais,
          })}
        </Text>
      </View>

      <Divider style={{marginVertical: 8}} />

      {/* Etiqueta inferior */}
      <View style={styles.footer}>
        {item.guia_codigo && (
          <View style={[styles.footerItem]}>
            <Text
              variant="bodySmall"
              style={[styles.info, {color: colors.primary}]}>
              Guia:
            </Text>
            <Text variant="bodySmall" style={{color: colors.primary}}>
              {item.guia_codigo} - {item.guia_numero}
            </Text>
          </View>
        )}
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Sku Cliente:
          </Text>
          <Text variant="bodySmall">{item.mate_skucliente}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            Lote:
          </Text>
          <Text variant="bodySmall">{item.mate_lote}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text variant="bodySmall" style={styles.info}>
            U.Med:
          </Text>
          <Text variant="bodySmall">{item.mate_medida}</Text>

          {obra?.valida_proyectado === '1' && (
            <>
              <Text variant="bodySmall" style={[styles.info, {marginLeft: 16}]}>
                Saldo:
              </Text>
              <Text variant="bodySmall">
                {formatearNumero({
                  valor: item.mate_saldo,
                  pais: user?.empr_pais,
                })}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* NUEVOS INPUTS */}
      <View style={styles.inputsContainer}>
        <CustomTextInput
          label="Cantidad"
          keyboardType="decimal-pad"
          value={cantidad}
          height={40}
          onChangeText={handleChangeCantidad}
          onBlur={() => handleSaveMaterial(cantidad, observacion)}
        />
        <CustomTextInput
          label="Observación"
          autoCapitalize="characters"
          height={80}
          multiline
          numberOfLines={3}
          value={observacion}
          onChangeText={handleChangeObservacion}
          onBlur={() => handleSaveMaterial(cantidad, observacion)}
        />
      </View>
    </CustomCardContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  footer: {
    flexWrap: 'wrap',
    position: 'relative',
    paddingVertical: 4,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  badgeItem: {
    backgroundColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  info: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  subtitle: {
    color: '#888',
  },
  inputsContainer: {
    marginTop: 8,
    gap: 8,
  },
});
