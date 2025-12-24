import { Box, Typography } from "@mui/material";

const AuthHeader = ({ title, subtitle }) => {
  return (
    <Box mb={3}>
      <Typography fontSize={22} fontWeight={600}>
        {title}
      </Typography>
      <Typography fontSize={14} color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AuthHeader;
