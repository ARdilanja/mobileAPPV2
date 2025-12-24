import { Box, TextField } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import AuthButton from "../components/AuthButton";

const Password = () => {
  return (
    <Box px={3} pt={6}>
      <AuthHeader
        title="Sign in"
        subtitle="Sign in and find your dream job"
      />

      <TextField fullWidth type="password" placeholder="Password" />
      <AuthButton text="Sign in" />
    </Box>
  );
};

export default Password;
