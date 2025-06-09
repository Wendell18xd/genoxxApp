import {Chip} from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {useMounted} from '../../../../hooks/useMounted';
import {globalColors} from '../../../../styles/globalStyle';
import {View} from 'react-native';

const IconRender = (icon: string, size: number, selected: boolean) => (
  <MaterialIcons name={icon} size={size} color={selected ? 'white' : 'black'} />
);

export const ChipsFiltroEjecucion = () => {
  const {value, setValue} = useMounted({
    defaultValue: '0',
    initialParams: {
      '0': true,
      '1': false,
    },
  });

  const getChipStylePendiente = (isSelected: boolean) => ({
    backgroundColor: isSelected ? globalColors.yellow : 'white',
    borderColor: isSelected ? globalColors.yellow : globalColors.yellow,
    borderWidth: 1,
  });

  const getChipStyleSuccess = (isSelected: boolean) => ({
    backgroundColor: isSelected ? globalColors.success : 'white',
    borderColor: isSelected ? globalColors.success : globalColors.success,
    borderWidth: 1,
  });

  const getTextStyleSuccess = (isSelected: boolean) => ({
    color: isSelected ? 'white' : 'black',
  });

  return (
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
        icon={({size}) => IconRender('palette-swatch-variant', size, false)}
        onPress={() => setValue('1')}
        style={getChipStylePendiente(value === '1')}
        textStyle={{color: 'black'}}>
        Pendientes
      </Chip>

      <Chip
        icon={({size}) => IconRender('cube-unfolded', size, value === '2')}
        onPress={() => setValue('2')}
        style={getChipStyleSuccess(value === '2')}
        textStyle={getTextStyleSuccess(value === '2')}>
        Ejecutados
      </Chip>
    </View>
  );
};
