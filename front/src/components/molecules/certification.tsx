import { Stack } from "@mui/material"

import { BlueButton } from "../atoms/buttons"
import { TextFieldAtom } from "../atoms/textInputs"
import { UnderNoticeAtom } from "../atoms/underNotice"

type T = {
  id: string
  label: string
  name: string
  type?: string
  value: string
  autoComplete?: string
  disabled?: boolean
  textDisabled?: boolean
  condition?: boolean
  notice?: any
  onChange?: any
  onClick?: any
  buttonText?: string
}

export function Certification({
  id,
  label,
  name,
  type,
  value,
  autoComplete,
  disabled,
  textDisabled,
  condition,
  notice,
  onChange,
  onClick,
  buttonText,
}: T): JSX.Element {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextFieldAtom id={id} label={label} name={name} type={type} value={value} autoComplete={autoComplete} disabled={textDisabled} onChange={onChange} />
        <BlueButton disabled={disabled} onClick={onClick}>
          {buttonText}
        </BlueButton>
      </Stack>
      <UnderNoticeAtom condition={condition}>{notice}</UnderNoticeAtom>
    </div>
  )
}

export function NoticeTextField({ id, label, name, type, value, autoComplete, textDisabled, condition, notice, onChange }: T): JSX.Element {
  return (
    <div>
      <TextFieldAtom id={id} label={label} name={name} type={type} value={value} autoComplete={autoComplete} disabled={textDisabled} onChange={onChange} />
      <UnderNoticeAtom condition={condition}>{notice}</UnderNoticeAtom>
    </div>
  )
}
