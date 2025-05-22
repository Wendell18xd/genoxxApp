import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Card} from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CustomCardContent = ({children, style}: Props) => {
  return (
    <Card style={[styles.card, style]}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
