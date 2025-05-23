import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const CustomCardContent = ({children, style, onPress}: Props) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
});
