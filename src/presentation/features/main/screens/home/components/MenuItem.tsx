import {StyleSheet, View} from 'react-native';
import {Menu} from '../../../../../../domain/entities/User';
import {Card, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParam} from '../../../../../navigations/MainStackNavigation';

interface Props {
  menu: Menu;
}

const MenuItem = ({menu}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<MainStackParam>>();

  return (
    <Card
      mode="elevated"
      onPress={() => {
        navigation.navigate('SideMenuNavigator');
      }}
      style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View
          style={[
            styles.box,
            {
              borderColor: colors.primary,
              backgroundColor: colors.primary + '10',
            },
          ]}>
          <MaterialIcons
            name={menu.menu_icoapp}
            color={colors.primary}
            size={30}
          />
        </View>

        <Text
          variant="bodyMedium"
          style={[styles.text, {color: colors.primary}]}>
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
