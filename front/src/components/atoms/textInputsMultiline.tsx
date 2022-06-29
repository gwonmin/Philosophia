import { TextField, TextFieldProps } from "@mui/material"

export function TextFieldMultilineAtom({
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
      id="outlined-multiline-static"
      // label="본문을 입력해주세요"
      multiline
      placeholder={placeholder}
      rows={15}
      defaultValue="Default Value"
      fullWidth
    />
  )
}
