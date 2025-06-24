import {useState} from 'react';
import {Portal, TextInput, Dialog, Button, Text} from 'react-native-paper';
import {format, parseISO, isBefore} from 'date-fns';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CustomTextInput from './CustomTextInput';
import { TextStyle } from 'react-native';

LocaleConfig.locales.es = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

interface Props {
  label: string;
  placeholder?: string;
  desde: string;
  hasta: string;
  onChange: (desde: string, hasta: string) => void;
  error?: boolean;
  title?: string;
  style?: TextStyle;
}

const CustomDateRangePicker: React.FC<Props> = ({
  label,
  placeholder,
  desde,
  hasta,
  onChange,
  error,
  title = 'Seleccione el rango de fechas',
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const openPicker = () => {
    setStartDate(desde || null);
    setEndDate(hasta || null);
    setVisible(true);
  };

  const handleDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      if (isBefore(new Date(day.dateString), new Date(startDate))) {
        setEndDate(startDate);
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onChange(startDate, endDate);
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const markedDates = () => {
    const marked: {[key: string]: any} = {};
    if (startDate && endDate) {
      let current = new Date(startDate);
      const last = new Date(endDate);
      while (current <= last) {
        const dateStr = format(current, 'yyyy-MM-dd');
        marked[dateStr] = {
          color: '#70d7c7',
          textColor: 'white',
        };
        current.setDate(current.getDate() + 1);
      }
      marked[startDate] = {
        startingDay: true,
        color: '#50cebb',
        textColor: 'white',
      };
      marked[endDate] = {
        endingDay: true,
        color: '#50cebb',
        textColor: 'white',
      };
    } else if (startDate) {
      marked[startDate] = {
        startingDay: true,
        endingDay: true,
        color: '#50cebb',
        textColor: 'white',
      };
    }
    return marked;
  };

  return (
    <>
      <CustomTextInput
        label={label}
        placeholder={placeholder}
        mode="outlined"
        value={
          desde && hasta
            ? `${format(parseISO(desde), 'dd/MM/yyyy')} - ${format(
                parseISO(hasta),
                'dd/MM/yyyy',
              )}`
            : ''
        }
        onPressIn={openPicker}
        showSoftInputOnFocus={false}
        error={error}
        left={<TextInput.Icon icon="calendar-range" />}
        style={[style]}
      />
      {error && (
        <Text style={{color: 'red', marginTop: 4}}>
          Seleccione un rango válido
        </Text>
      )}

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleCancel}
          style={{backgroundColor: 'white'}}>
          <Dialog.Title style={{ fontSize: 18 }}>{title}</Dialog.Title>
          <Dialog.Content>
            <Calendar
              onDayPress={handleDayPress}
              markingType="period"
              markedDates={markedDates()}
              style={{borderRadius: 8}}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancelar</Button>
            <Button onPress={handleConfirm} disabled={!startDate || !endDate}>
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CustomDateRangePicker;
