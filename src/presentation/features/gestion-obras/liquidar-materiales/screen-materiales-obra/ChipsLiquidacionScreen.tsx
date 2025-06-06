import {useState} from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
import {globalColors} from '../../../../styles/globalStyle';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

const IconRender = (icon: string, size: number, selected: boolean) => (
  <MaterialIcons name={icon} size={size} color={selected ? 'white' : 'black'} />
);

interface Props {
  children: React.ReactNode;
}

export const ChipsLiquidacionScreen = ({children}: Props) => {
  const [selected, setSelected] = useState<'materiales' | 'partidas'>(
    'materiales',
  );

  const getChipStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? globalColors.primary : 'white',
    borderColor: isSelected ? globalColors.primary : '#ccc',
    borderWidth: 1,
  });

  const getTextStyle = (isSelected: boolean) => ({
    color: isSelected ? 'white' : 'black',
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}>
        <Chip
          icon={({size}) =>
            IconRender(
              'palette-swatch-variant',
              size,
              selected === 'materiales',
            )
          }
          onPress={() => setSelected('materiales')}
          style={getChipStyle(selected === 'materiales')}
          textStyle={getTextStyle(selected === 'materiales')}>
          Materiales
        </Chip>

        <Chip
          icon={({size}) =>
            IconRender('cube-unfolded', size, selected === 'partidas')
          }
          onPress={() => setSelected('partidas')}
          style={getChipStyle(selected === 'partidas')}
          textStyle={getTextStyle(selected === 'partidas')}>
          Partidas
        </Chip>
      </View>

      <View style={{flex: 1}}>{children}</View>
    </View>
  );
};
