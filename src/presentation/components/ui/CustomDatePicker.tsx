import {useState} from 'react';
import CustomTextInput from './CustomTextInput';
import {format, parseISO} from 'date-fns';
import {Portal, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {parseLocalDate} from '../../helper/timeUtils';
import {TextStyle} from 'react-native';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
  style?: TextStyle;
}

const CustomDatePicker: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  maximumDate,
  minimumDate,
  style,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomTextInput
        label={label}
        placeholder={placeholder}
        mode="outlined"
        value={value ? format(parseISO(value), 'dd/MM/yyyy') : ''}
        onPressIn={() => setOpen(true)}
        error={error}
        left={<TextInput.Icon icon="calendar" />} // Si usas Icon como subcomponente
        showSoftInputOnFocus={false}
        style={[style]}
      />
      <Portal>
        <DatePicker
          modal
          open={open}
          date={value ? parseLocalDate(value) : new Date()}
          title={`Selecciona ${label}`}
          cancelText="Cancelar"
          confirmText="Confirmar"
          mode="date"
          locale="es"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onConfirm={date => {
            setOpen(false);
            const formatted = format(date, 'yyyy-MM-dd');
            onChange(formatted);
          }}
          onCancel={() => setOpen(false)}
        />
      </Portal>
    </>
  );
};

export default CustomDatePicker;
