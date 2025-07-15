import { StyleSheet, View } from 'react-native';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import { useMounted } from '../../../../hooks/useMounted';
import { globalColors } from '../../../../styles/globalStyle';
import { Chip } from 'react-native-paper';
import { LiquiMatScreen } from './LiquidacionMateriales/LiquiMatScreen';
import { LiquiPartidasScreen } from './LiquidacionPartidasATC/LiquiPartidasScreen';


const IconRender = (icon: string, size: number, selected: boolean) => (
  <MaterialIcons name={icon} size={size} color={selected ? 'white' : 'black'} />
);

export const ChipsLiquidacionMatScreen = () => {
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': false,
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
            IconRender('palette-swatch-variant', size, value === '1')
          }
          onPress={() => setValue('1')}
          style={getChipStyle(value === '1')}
          textStyle={getTextStyle(value === '1')}>
          Materiales
        </Chip>

        <Chip
          icon={({size}) => IconRender('cube-unfolded', size, value === '2')}
          onPress={() => setValue('2')}
          style={getChipStyle(value === '2')}
          textStyle={getTextStyle(value === '2')}>
          Partidas
        </Chip>
      </View>

      <View style={styles.screenContainer}>
        {mounted['1'] && (
          <View style={[styles.screen, value !== '1' && styles.hidden]}>
            <LiquiMatScreen/>
          </View>
        )}
        {mounted['2'] && (
          <View style={[styles.screen, value !== '2' && styles.hidden]}>
            <LiquiPartidasScreen/>
          </View>
        )}
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
