import {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const LoginScreen = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <Text>LoginScreen</Text>
      <TextInput label="Email" value={text} onChangeText={setText} />
    </View>
  );
};
export default LoginScreen;
