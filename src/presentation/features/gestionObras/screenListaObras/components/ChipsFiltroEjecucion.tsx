import {Chip} from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {globalColors} from '../../../../styles/globalStyle';
import {View} from 'react-native';

const IconRender = (icon: string, size: number, selected: boolean) => (
  <MaterialIcons name={icon} size={size} color={selected ? 'white' : 'black'} />
);

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ChipsFiltroEjecucion = ({value, setValue}: Props) => {
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
        onPress={() => setValue('0')}
        style={getChipStylePendiente(value === '0')}
        textStyle={{color: 'black'}}>
        Pendientes
      </Chip>

      <Chip
        icon={({size}) => IconRender('cube-unfolded', size, value === '1')}
        onPress={() => setValue('1')}
        style={getChipStyleSuccess(value === '1')}
        textStyle={getTextStyleSuccess(value === '1')}>
        Ejecutados
      </Chip>
    </View>
  );
};
