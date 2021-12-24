import { createTheme } from "@mui/material";

const primaryLightColor = "#DAFBF7";
const primaryMainColor = "#B2F7EF";
const primaryDarkColor = "#59EEDC";

const secondaryLightColor = "#F9DCEB";
const secondaryMainColor = "#F2B5D4";
const secondaryDarkColor = "#E363A3";

const theme = createTheme({
  palette: {
    primary: {
      light: primaryLightColor,
      main: primaryMainColor,
      dark: primaryDarkColor,
    },
    secondary: {
      light: secondaryLightColor,
      main: secondaryMainColor,
      dark: secondaryDarkColor,
    },
  },
});

export default theme;
