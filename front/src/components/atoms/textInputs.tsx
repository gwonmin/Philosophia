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
  sx,
}: TextFieldProps) {
  const commonProps = {
    required,
    id,
    label,
    name,
    type,
    autoComplete,
    disabled,
    sx,
  }
  return (
    <TextField
      {...commonProps}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      fullWidth
      sx={{ mb: 3, ...sx }}
    />
  )
}
