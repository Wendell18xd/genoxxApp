import {List} from 'react-native-paper';
import {Style} from 'react-native-paper/lib/typescript/components/List/utils';

interface Props {
  color: string;
  style?: Style;
}
export const RenderListItemIcon =
  (icon: string, color: string) => (props: Props) =>
    <List.Icon {...props} icon={icon} color={color} />;
