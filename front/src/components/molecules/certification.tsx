import React from "react";

import { Stack } from "@mui/material";

import { BlueButton, GreenButton } from "../atoms/buttons";
import { TextFieldAtom } from "../atoms/textInput";

type T = {
  id: string;
  label: string;
  name: string;
  autoComplete?: string;
  onChange: any;
  onClick: any;
  buttonText: string;
};

export function Certification({
  id,
  label,
  name,
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
        autoComplete={autoComplete}
        onChange={onChange}
      />
      <BlueButton onClick={onClick}>{buttonText}</BlueButton>
    </Stack>
  );
}
