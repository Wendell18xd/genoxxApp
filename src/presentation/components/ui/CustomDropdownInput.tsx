import {
  Dropdown,
  DropdownInputProps,
  Option,
} from 'react-native-paper-dropdown';
import {TextInput} from 'react-native-paper';
import {useField, useFormikContext} from 'formik';
import {useMemo} from 'react';

interface Props {
  height?: number;
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
  icon?: string;
  mode?: 'outlined' | 'flat';
}

export const CustomDropdownInput: React.FC<Props> = ({
  height = 60,
  name,
  label,
  placeholder = '',
  options,
  icon,
  mode = 'outlined',
}) => {
  const {setFieldValue} = useFormikContext();
  const [field, meta] = useField(name);

  const hasError = Boolean(meta.touched && meta.error);

  const DropdownInput = useMemo(() => {
    return ({selectedLabel, rightIcon}: DropdownInputProps) => (
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        label={label}
        value={selectedLabel}
        editable={false}
        pointerEvents="none"
        error={hasError}
        style={{
          height: height,
        }}
        left={icon ? <TextInput.Icon icon={icon} /> : undefined}
        right={rightIcon}
      />
    );
  }, [icon, height, mode, hasError, label]);

  return (
    <Dropdown
      label={label}
      mode={mode}
      placeholder={placeholder}
      options={options}
      value={field.value}
      onSelect={val => setFieldValue(name, val)}
      CustomDropdownInput={DropdownInput}
    />
  );
};
