import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import IonIcons from '@react-native-vector-icons/ionicons';
import { useTheme } from 'react-native-paper';

interface CustomCheckboxProps {
  label: string;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle; // Agregado para permitir estilos personalizados en el TouchableOpacity
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  onChange,
  style,
}) => {
  const {colors} = useTheme();
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]} // Fusionamos estilos predeterminados con los proporcionados
      onPress={toggleCheckbox}>
      <View style={[styles.checkbox]}>
        <IonIcons
          name={checked ? 'checkbox' : 'square-outline'}
          size={20}
          color={checked ? colors.primary : 'black'} // Cambia el color según el estado
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckbox;
