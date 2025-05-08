import {View} from 'react-native';
import {Menu} from '../../../../../../domain/entities/User';
import {Card, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';

interface Props {
  menu: Menu;
}

const MenuItem = ({menu}: Props) => {
  const {colors} = useTheme();

  return (
    <Card
      mode="elevated"
      onPress={() => {}}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 160,
        backgroundColor: 'white',
      }}>
      <Card.Content
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.primary + '10',
          }}>
          <MaterialIcons
            name={menu.menu_icoapp}
            color={colors.primary}
            size={30}
          />
        </View>

        <Text
          variant="bodyMedium"
          style={{marginTop: 8, textAlign: 'center', color: colors.primary}}>
          {menu.menu_nombre}
        </Text>
      </Card.Content>
    </Card>
  );
};
export default MenuItem;
