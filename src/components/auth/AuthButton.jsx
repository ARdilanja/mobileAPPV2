import { Button } from "@mui/material";

const AuthButton = ({ text, onClick, sx }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      sx={{
        borderRadius: "24px",
        py: 1.4,
        textTransform: "none",
        fontWeight: 600,
        mt: 2,
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default AuthButton;
