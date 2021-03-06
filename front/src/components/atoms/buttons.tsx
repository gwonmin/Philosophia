import { Button, ButtonProps } from "@mui/material";
import { Children } from "react";

export function BlueButton({ disabled, onClick, children }: ButtonProps): JSX.Element {
  return (
    <Button disabled={disabled} onClick={onClick} variant="contained" size="small" sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}>
      {children}
    </Button>
  )
}

export function GreenButton({ disabled, children, onClick }: ButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick} variant="contained" size="small" color="success" sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}>
      {children}
    </Button>
  )
}

export function GrayButton({ children, onClick }: ButtonProps){
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#888",
      }}
    >
      {children}
    </Button>
  )
}
