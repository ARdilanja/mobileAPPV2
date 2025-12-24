import { Box, Typography } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import SocialButton from "../components/SocialButton";

const SignIn = () => {
  return (
    <Box px={3} pt={6}>
      <AuthHeader
        title="Sign in"
        subtitle="Sign in and find your dream job"
      />

      <SocialButton text="Sign in with Google" />
      <SocialButton text="Sign in with Email" />
      <SocialButton text="Sign in with Mobile" />

      <Typography fontSize={13} mt={2} textAlign="center">
        Don’t have an account?{" "}
        <span style={{ color: "#1a73e8" }}>Sign up</span>
      </Typography>
    </Box>
  );
};

export default SignIn;
