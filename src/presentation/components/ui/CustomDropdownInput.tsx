import {
  Dropdown,
  DropdownInputProps,
  Option,
} from 'react-native-paper-dropdown';
import {TextInput} from 'react-native-paper';
import {useField, useFormikContext} from 'formik';

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

  return (
    <Dropdown
      label={label}
      mode={mode}
      placeholder={placeholder}
      options={options}
      value={field.value}
      onSelect={val => setFieldValue(name, val)}
      CustomDropdownInput={props =>
        DropdownInput({...props, error: hasError}, icon, height)
      }
    />
  );
};

const DropdownInput = (
  {placeholder, selectedLabel, rightIcon, error, label}: DropdownInputProps,
  icon: string | undefined,
  height: number,
) => (
  <TextInput
    mode="outlined"
    placeholder={placeholder}
    label={label}
    value={selectedLabel}
    editable={false}
    pointerEvents="none"
    error={error}
    style={{
      height: height,
    }}
    left={icon ? <TextInput.Icon icon={icon} /> : undefined}
    right={rightIcon}
  />
);
