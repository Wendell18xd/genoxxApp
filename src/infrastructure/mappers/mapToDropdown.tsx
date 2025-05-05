export function mapToDropdown<T extends Record<string, any>>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T,
): {label: string; value: string}[] {
  return data.map(item => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
}
