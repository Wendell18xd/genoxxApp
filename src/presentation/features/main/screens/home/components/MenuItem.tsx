import {StyleSheet, View} from 'react-native';
import {Menu} from '../../../../../../domain/entities/User';
import {Card, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';

interface Props {
  menu: Menu;
  onPress?: () => void;
}

const MenuItem = ({menu, onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <Card mode="elevated" onPress={onPress} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View
          style={[
            styles.box,
            {
              borderColor: colors.secondary,
              backgroundColor: colors.primary + '10',
            },
          ]}>
          <MaterialIcons
            name={menu.menu_icoapp}
            color={colors.secondary}
            size={30}
          />
        </View>

        <Text
          variant="bodyMedium"
          style={[styles.text, {color: colors.secondary}]}>
          {menu.menu_nombre}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 160,
    backgroundColor: 'white',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 20,
    borderWidth: 1,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MenuItem;
