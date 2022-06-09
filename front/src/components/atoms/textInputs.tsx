import { TextField, TextFieldProps } from "@mui/material";

export function TextFieldAtom({
  required = true,
  id,
  label,
  name,
  value,
  autoComplete,
  onChange,
}: TextFieldProps) {
  const commonProps = {
    required,
    id,
    label,
    name,
    value,
    autoComplete,
  };
  return (
    <TextField
      {...commonProps}
      onChange={onChange}
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
    />
  );
}
