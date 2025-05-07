import Icons from '@react-native-vector-icons/material-design-icons';
import {StyleProp, TextStyle} from 'react-native';

export type IonIconProns = 'cog' | 'home' | 'account' | 'bell';

interface Props {
  name: IonIconProns | any;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

const MaterialIcons = ({name, color, size = 20, style}: Props) => {
  return <Icons name={name} size={size} color={color} style={style} />;
};
export default MaterialIcons;
