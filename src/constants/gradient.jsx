import { createTheme } from "@mui/material/styles";

const gradient = createTheme({
  palette: {
    primary: {
      main: "#1a73e8",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          background: "linear-gradient(180deg, #9acbff 0%, #ffffff 70%)",
        },
      },
    },
  },
});

export default gradient;
