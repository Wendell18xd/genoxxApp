import {Text} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {FlatList} from 'react-native';
import {SearchObras} from './components/SearchObras';
import {useMainStore} from '../../../../store/main/useMainStore';

export const ListaObrasScreen = () => {
  const {drawerKey} = useMainStore();

  console.log('drawerKey', drawerKey);

  return (
    <DrawerLayout>
      <FlatList
        data={[]}
        renderItem={() => <Text>ListaObrasScreen</Text>}
        ListHeaderComponent={<SearchObras />}
        style={{padding: 16}}
      />
    </DrawerLayout>
  );
};
