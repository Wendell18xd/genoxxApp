import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DrawerLayout from '../../../../main/layout/DrawerLayout';
import ListaSeriados from './components/ListaSeriados';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';
import SegmentBottom from './components/SegmentBottom';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export interface MaterialLiquidado {
  id: string;
  codMaterial: string;
  descripcion: string;
  skuCliente: string;
  nroSerie: string;
  seleccionado: boolean;
}

const materialesMock: MaterialLiquidado[] = [
  {
    id: '1',
    codMaterial: 'MATCL00414',
    descripcion: 'EMTA MOD-TG2492 ARRIS',
    skuCliente: 'ID-023-0014-37437',
    nroSerie: '1835D11E409B',
    seleccionado: false,
  },
  {
    id: '2',
    codMaterial: 'MATCL12',
    descripcion: 'EMTA MOD-TG2492 ARRIS',
    skuCliente: 'ID-023-0014-37437',
    nroSerie: '1835D11E409B',
    seleccionado: false,
  },
  {
    id: '3',
    codMaterial: 'MATCl90',
    descripcion: 'EMTA MOD-TG2492 ARRIS',
    skuCliente: 'ID-023-0014-37437',
    nroSerie: '1835D11E409B',
    seleccionado: false,
  },
];

const SeriadosScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  return (
    <DrawerLayout primary curvaHeight={80} title="Liquidar Seriados">
      <View style={{marginTop: 16, marginHorizontal: 32}}>
        <CustomTextInput
          placeholder="Nro serie"
          mode="outlined"
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <SegmentBottom
        totalCount={materialesMock.length}
        selectedCount={selectedIds.length}
      />

      {/* <SegmentedControlTab
        values={['First', 'Second', 'Third']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
      /> */}

      <View style={styles.wrapper}>
        <ListaSeriados
          data={materialesMock}
          selectedIds={selectedIds}
          onSelect={onSelect}
        />
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default SeriadosScreen;
