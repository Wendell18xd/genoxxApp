import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useLiquiMateStore} from '../store/useLiquiMateStore';
import {useEffect, useState} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import {DetalleObraScreen} from '../screen-detalle-obra/DetalleObraScreen';
import {MaterialesObraScreen} from '../screen-materiales-obra/MaterialesObraScreen';
import {FotosObraScreen} from '../screen-fotos-obra/FotosObraScreen';

export const SegmentedButtonsDetalleObras = () => {
  const {reset} = useLiquiMateStore();
  const [value, setValue] = useState('1');
  const {colors} = useTheme();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <DrawerLayout title="Detalle de Obra">
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          theme={{
            colors: {
              secondaryContainer: colors.secondary,
            },
          }}
          buttons={[
            {
              value: '1',
              label: 'Detalle',
              checkedColor: 'white',
              icon: 'format-list-bulleted-type',
            },
            {
              value: '2',
              label: 'Materiales',
              checkedColor: 'white',
              icon: 'cube',
            },
            {
              value: '3',
              label: 'Fotos',
              checkedColor: 'white',
              icon: 'camera',
            },
          ]}
        />
      </View>
      {value === '1' && <DetalleObraScreen />}
      {value === '2' && <MaterialesObraScreen />}
      {value === '3' && <FotosObraScreen />}
    </DrawerLayout>
  );
};
