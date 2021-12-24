import { createTheme } from "@mui/material";

const primaryLightColor = "#B5EDF8";
const primaryMainColor = "#7BDFF2";
const primaryDarkColor = "#33CCEB";

const secondaryLightColor = "#F3B9D6";
const secondaryMainColor = "#E774AD";
const secondaryDarkColor = "#DC2E85";

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
