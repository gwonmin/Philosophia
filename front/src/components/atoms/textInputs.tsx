import { TextField, TextFieldProps } from "@mui/material"

export function TextFieldAtom({
  required = true,
  id,
  label,
  name,
  type,
  value,
  placeholder,
  autoComplete,
  disabled,
  onChange,
}: TextFieldProps) {
  const commonProps = {
    required,
    id,
    label,
    name,
    type,
    autoComplete,
    disabled,
  }
  return (
    <TextField
      {...commonProps}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      fullWidth
      sx={{ mb: 3 }}
    />
  )
}
