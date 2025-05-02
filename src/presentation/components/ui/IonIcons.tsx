import Ionicons from '@react-native-vector-icons/ionicons';
import {StyleProp, TextStyle} from 'react-native';

export type IonIconProns =
  | 'cube-outline'
  | 'albums-outline'
  | 'list-outline'
  | 'copy-outline'
  | 'download-outline'
  | 'flower-outline'
  | 'flask-outline'
  | 'toggle-outline'
  | 'alert-circle-outline'
  | 'document-text-outline'
  | 'chevron-forward-outline'
  | 'settings'
  | 'refresh-outline';

interface Props {
  name: IonIconProns;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

const IonIcons = ({name, color, size = 20, style}: Props) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};
export default IonIcons;
