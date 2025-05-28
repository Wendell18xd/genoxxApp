import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {ScrollView} from 'react-native-gesture-handler';

import {View} from 'react-native';
import {useDetalleConsulta} from './hooks/useDetalleConsulta';

export const DetalleConsultaScreen = () => {
  const {campos} = useDetalleConsulta();

  return (
    <DrawerLayout>
      <ScrollView
        contentContainerStyle={{padding: 16}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[0]?.label}
              value={campos[0]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[1]?.label}
              value={campos[1]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[2]?.label}
              value={campos[2]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[3]?.label}
              value={campos[3]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 0.5, marginRight: 8}}>
            <CustomTextInput
              label={campos[4]?.label}
              value={campos[4]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[5]?.label}
              value={campos[5]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[6]?.label}
              value={campos[6]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[7]?.label}
              value={campos[7]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[8]?.label}
              value={campos[8]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[9]?.label}
              value={campos[9]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[10]?.label}
              value={campos[10]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[11]?.label}
              value={campos[11]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[12]?.label}
              value={campos[12]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[13]?.label}
              value={campos[13]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[14]?.label}
              value={campos[14]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[15]?.label}
              value={campos[15]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[16]?.label}
              value={campos[16]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[17]?.label}
              value={campos[17]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[18]?.label}
              value={campos[18]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[19]?.label}
              value={campos[19]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[20]?.label}
              value={campos[20]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[21]?.label}
              value={campos[21]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[22]?.label}
              value={campos[22]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[23]?.label}
              value={campos[23]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[24]?.label}
              value={campos[24]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[25]?.label}
              value={campos[25]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[26]?.label}
              value={campos[26]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[27]?.label}
              value={campos[27]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[28]?.label}
              value={campos[28]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[29]?.label}
              value={campos[29]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[30]?.label}
              value={campos[30]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[31]?.label}
              value={campos[31]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[32]?.label}
              value={campos[32]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <View style={{flex: 1, marginRight: 8}}>
            <CustomTextInput
              label={campos[33]?.label}
              value={campos[33]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomTextInput
              label={campos[34]?.label}
              value={campos[34]?.value ?? ''}
              mode="outlined"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </DrawerLayout>
  );
};
