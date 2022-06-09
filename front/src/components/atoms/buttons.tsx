import { Button, ButtonProps } from "@mui/material";

export function BlueButton({ onClick, children }: ButtonProps): JSX.Element {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size="small"
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
    >
      {children}
    </Button>
  );
}

export function GreenButton({ children, onClick }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      size="small"
      color="success"
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
    >
      {children}
    </Button>
  );
}
