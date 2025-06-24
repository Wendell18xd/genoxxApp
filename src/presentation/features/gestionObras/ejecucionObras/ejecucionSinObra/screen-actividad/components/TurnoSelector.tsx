import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const opciones = [
  {
    label: 'Diurno',
    icon: 'white-balance-sunny',
    value: 'diurno',
    selectedColor: '#FFD54F', // amarillo claro
    textColor: '#000',
  },
  {
    label: 'Nocturno',
    icon: 'weather-night',
    value: 'nocturno',
    selectedColor: '#37474F', // azul oscuro
    textColor: '#fff',
  },
];

export const TurnoSelector = ({value, onChange}: Props) => {
  return (
    <View style={styles.container}>
      {opciones.map(op => {
        const selected = value === op.value;
        return (
          <Pressable
            key={op.value}
            onPress={() => onChange(op.value)}
            style={[
              styles.option,
              {
                backgroundColor: selected ? op.selectedColor : '#f0f0f0',
                shadowOpacity: selected ? 0.3 : 0,
              },
            ]}>
            <MaterialIcons
              name={op.icon}
              size={20}
              color={selected ? op.textColor : '#555'}
              style={{marginRight: 8}}
            />
            <Text
              style={[styles.label, {color: selected ? op.textColor : '#333'}]}>
              {op.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
