import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {globalColors} from '../../../styles/globalStyle';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import {useMounted} from '../../../hooks/useMounted';
import {FotosObraScreen} from './FotosObraScreen';

const IconRender = (icon: string, size: number, selected: boolean) => (
  <MaterialIcons name={icon} size={size} color={selected ? 'white' : 'black'} />
);

export const ChipsFotosObrasScreen = () => {
  const {value, setValue} = useMounted({
    defaultValue: 'materiales',
    initialParams: {
      'materiales': true,
      'partidas': false,
    },
  });

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
            IconRender('palette-swatch-variant', size, value === 'materiales')
          }
          onPress={() => setValue('materiales')}
          style={getChipStyle(value === 'materiales')}
          textStyle={getTextStyle(value === 'materiales')}>
          Materiales
        </Chip>

        <Chip
          icon={({size}) => IconRender('cube-unfolded', size, value === 'partidas')}
          onPress={() => setValue('partidas')}
          style={getChipStyle(value === 'partidas')}
          textStyle={getTextStyle(value === 'partidas')}>
          Partidas
        </Chip>
      </View>

      <View style={styles.screenContainer}>
        <FotosObraScreen opcion={value}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
