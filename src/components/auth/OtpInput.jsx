import { Box, TextField } from "@mui/material";

const OtpInput = ({ length = 4 }) => {
  return (
    <Box display="flex" gap={1.2}>
      {[...Array(length)].map((_, i) => (
        <TextField
          key={i}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: 18 },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
