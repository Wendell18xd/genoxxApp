import {
  Dropdown,
  DropdownInputProps,
  Option,
} from 'react-native-paper-dropdown';
import {TextInput} from 'react-native-paper';
import {useMemo} from 'react';

interface Props {
  height?: number;
  label: string;
  placeholder?: string;
  options: Option[];
  icon?: string;
  mode?: 'outlined' | 'flat';
  value: string;
  onSelect: (val?: string) => void;
  error?: boolean;
}

export const CustomDropdownInput: React.FC<Props> = ({
  height = 60,
  label,
  placeholder = '',
  options,
  icon,
  mode = 'outlined',
  value,
  onSelect,
  error = false,
}) => {
  const DropdownInput = useMemo(() => {
    return ({selectedLabel, rightIcon}: DropdownInputProps) => (
      <TextInput
        mode={mode}
        placeholder={placeholder}
        label={label}
        value={selectedLabel}
        editable={false}
        pointerEvents="none"
        error={error}
        style={{height}}
        left={icon ? <TextInput.Icon icon={icon} /> : undefined}
        right={rightIcon}
      />
    );
  }, [icon, height, mode, error, label, placeholder]);

  return (
    <Dropdown
      label={label}
      mode={mode}
      placeholder={placeholder}
      options={options}
      value={value}
      onSelect={onSelect}
      CustomDropdownInput={DropdownInput}
    />
  );
};
