import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#ffc071",
      dark: "#c69659",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    orangeColor: "#ffc071",
    blackColor: "rgba(0, 0, 0, 0.87)",
  },
});

export default theme;
