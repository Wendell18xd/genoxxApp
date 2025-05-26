import {View, StyleSheet, Platform} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../helper/utils';

interface Props {
  isOn: boolean;
  text?: string;
  onChange: (value: boolean) => void;
}

const CustomSwitch = ({isOn, text, onChange}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.switchRow}>
      {text && <Text>{text}</Text>}

      <Switch
        thumbColor={
          Platform.OS === 'android'
            ? isOn
              ? colors.primary
              : '#FFFFFF'
            : undefined
        }
        ios_backgroundColor="#3e3e3e"
        trackColor={{false: '#ccc', true: hexToRgba(colors.primary, 0.5)}}
        onValueChange={onChange}
        value={isOn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomSwitch;
