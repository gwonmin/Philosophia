import { TextField, TextFieldProps } from "@mui/material";

export function TextFieldAtom({
  required = true,
  id,
  label,
  name,
  type,
  value,
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
  };
  return (
    <TextField
      {...commonProps}
      onChange={onChange}
      value={value}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        p: 1,
      }}
    />
  );
}
