import { Stack } from "@mui/material";

import { BlueButton } from "../atoms/buttons";
import { TextFieldAtom } from "../atoms/textInputs";

type T = {
  id: string;
  label: string;
  name: string;
  value: string;
  autoComplete?: string;
  onChange: any;
  onClick: any;
  buttonText: string;
};

export function Certification({
  id,
  label,
  name,
  value,
  autoComplete,
  onChange,
  onClick,
  buttonText,
}: T): JSX.Element {
  return (
    <Stack direction="row" spacing={2}>
      <TextFieldAtom
        id={id}
        label={label}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
      <BlueButton onClick={onClick}>{buttonText}</BlueButton>
    </Stack>
  );
}
