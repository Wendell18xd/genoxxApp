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
        TextInputCustom(props, mode, icon, height,hasError)
      }
    />
  );
};

const TextInputCustom = (
  props: DropdownInputProps,
  mode: 'outlined' | 'flat',
  icon?: string,
  height?: number,
  hasError?: boolean,
) => (
  <TextInput
    {...props}
    mode={mode}
    value={props.selectedLabel ?? ''}
    editable={false}
    pointerEvents="none"
    style={{height: height}}
    error={hasError}
    left={icon ? <TextInput.Icon icon={icon} /> : undefined}
    right={<TextInput.Icon icon="menu-down" />}
  />
);
