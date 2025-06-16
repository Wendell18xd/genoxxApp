import {useState} from 'react';
import CustomTextInput from './CustomTextInput';
import {format} from 'date-fns';
import {Portal, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {TextStyle} from 'react-native';

interface Props {
  label: string;
  placeholder?: string;
  value: string; // formato esperado: 'HH:mm'
  onChange: (value: string) => void;
  error?: boolean;
  style?: TextStyle;
}

const CustomTimePicker: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  style,
}) => {
  const [open, setOpen] = useState(false);

  // Convertir "HH:mm" a objeto Date
  const getTimeAsDate = () => {
    if (!value) {
      return new Date();
    }
    const [hours, minutes] = value.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  return (
    <>
      <CustomTextInput
        label={label}
        placeholder={placeholder}
        mode="outlined"
        value={value || ''}
        onPressIn={() => setOpen(true)}
        error={error}
        left={<TextInput.Icon icon="clock-outline" />}
        showSoftInputOnFocus={false}
        style={style}
      />

      <Portal>
        <DatePicker
          modal
          open={open}
          date={getTimeAsDate()}
          title={`Selecciona ${label}`}
          cancelText="Cancelar"
          confirmText="Confirmar"
          mode="time"
          locale="es"
          is24hourSource="locale"
          onConfirm={date => {
            setOpen(false);
            const formatted = format(date, 'HH:mm');
            onChange(formatted);
          }}
          onCancel={() => setOpen(false)}
        />
      </Portal>
    </>
  );
};

export default CustomTimePicker;
