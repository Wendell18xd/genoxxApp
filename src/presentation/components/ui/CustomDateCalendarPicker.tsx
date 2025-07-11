import {useState} from 'react';
import {Portal, Dialog, Button, TextInput, Text} from 'react-native-paper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format, parseISO, isBefore, isAfter} from 'date-fns';
import CustomTextInput from './CustomTextInput';
import {TextStyle} from 'react-native';

LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  title?: string;
  editable?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
  style?: TextStyle;
}

const CustomDateCalendarPicker: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  title = 'Seleccione la fecha',
  maximumDate,
  minimumDate,
  style,
  editable = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const openPicker = () => {
    setSelectedDate(value || null);
    setVisible(true);
  };

  const handleDayPress = (day: any) => {
    const date = new Date(day.dateString);
    if (
      (minimumDate && isBefore(date, minimumDate)) ||
      (maximumDate && isAfter(date, maximumDate))
    ) {
      return;
    }
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onChange(selectedDate);
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const markedDates = selectedDate
    ? {
        [selectedDate]: {
          selected: true,
          selectedColor: '#50cebb',
          textColor: 'white',
        },
      }
    : {};

  return (
    <>
      <CustomTextInput
        label={label}
        placeholder={placeholder}
        mode="outlined"
        value={value ? format(parseISO(value), 'dd/MM/yyyy') : ''}
        onPressIn={openPicker}
        error={error}
        editable={editable}
        left={<TextInput.Icon icon="calendar" />}
        showSoftInputOnFocus={false}
        style={[style]}
      />
      {error && (
        <Text style={{color: 'red', marginTop: 4}}>
          Seleccione una fecha válida
        </Text>
      )}

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleCancel}
          style={{backgroundColor: 'white'}}>
          <Dialog.Title style={{fontSize: 18}}>{title}</Dialog.Title>
          <Dialog.Content>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              markingType="custom"
              style={{borderRadius: 8}}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancelar</Button>
            <Button onPress={handleConfirm} disabled={!selectedDate}>
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CustomDateCalendarPicker;
