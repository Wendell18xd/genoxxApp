import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface CustomDatePickerProps {
  isVisible: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({isVisible, onConfirm, onCancel}) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default CustomDatePicker;
