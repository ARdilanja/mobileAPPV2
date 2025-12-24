import { Button } from "@mui/material";

const SocialButton = ({ icon, text, onClick }) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      onClick={onClick}
      sx={{
        borderRadius: "24px",
        py: 1.3,
        textTransform: "none",
        fontWeight: 500,
        mb: 1.5,
      }}
    >
      {text}
    </Button>
  );
};

export default SocialButton;
