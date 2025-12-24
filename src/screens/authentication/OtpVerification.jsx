import { Box, TextField } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import AuthButton from "../components/AuthButton";

const MobileInput = () => {
  return (
    <Box px={3} pt={6}>
      <AuthHeader
        title="Sign in"
        subtitle="Sign in and find your dream job"
      />

      <TextField fullWidth placeholder="+91 9876543210" />
      <AuthButton text="Next" />
    </Box>
  );
};

export default MobileInput;
