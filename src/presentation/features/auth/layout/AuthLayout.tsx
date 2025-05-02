import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IonIcons from '../../../components/ui/IonIcons';
import CurvaView from '../../../components/ui/CurvaView';

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = ({children}: Props) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: colors.primary}}>
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <Text variant="labelSmall" style={{color: 'white'}}>
            1.0.0
          </Text>
          <TouchableOpacity>
            <IonIcons name="settings" color="white" />
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../../../assets/images/logo_app.png')}
          style={styles.boxImage}
        />
      </View>

      <View style={{width: '100%'}}>
        <CurvaView />
      </View>

      <View
        style={[
          styles.containerChildren,
          {backgroundColor: colors.background},
        ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 32,
    position: 'relative',
    height: 250,
  },
  boxHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxImage: {
    width: 120,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'stretch',
    top: 28,
    position: 'absolute',
  },
  containerChildren: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});

export default AuthLayout;
