import {
  Dropdown,
  DropdownInputProps,
  Option,
} from 'react-native-paper-dropdown';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useMemo} from 'react';
import {View} from 'react-native';

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
  loading?: boolean;
  disabled?: boolean;
}

const LoadingIcon = () => <ActivityIndicator color="gray" size="small" />;

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
  loading = false,
  disabled = false,
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
        style={{height, backgroundColor: 'transparent'}}
        left={
          loading ? (
            <TextInput.Icon icon={LoadingIcon} />
          ) : icon ? (
            <TextInput.Icon icon={icon} />
          ) : undefined
        }
        right={rightIcon}
        disabled={disabled}
      />
    );
  }, [icon, height, mode, error, label, placeholder, loading, disabled]);

  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <Dropdown
        label={label}
        mode={mode}
        placeholder={placeholder}
        options={options}
        value={value}
        onSelect={onSelect}
        CustomDropdownInput={DropdownInput}
        menuContentStyle={{
          backgroundColor: '#f5f5f5',
        }}
      />
    </View>
  );
};
