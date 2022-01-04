import { Components, Theme } from "@mui/material";

const Button = (theme: Theme): Components => ({
  MuiButton: {
    styleOverrides: {
      root: {},
      sizeLarge: 48,
      containedInherit: {
        color: theme.palette.grey[800],
        boxShadow: theme.customShadows.z8,
        "&:hover": {
          backgroundColor: theme.palette.grey[400],
        },
      },
      containedPrimary: {
        boxShadow: theme.customShadows.primary,
      },
      containedSecondary: {
        boxShadow: theme.customShadows.secondary,
      },
      outlinedInherit: {
        border: `1px solid ${theme.palette.grey[500]}`,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      },
      textInherit: {
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
});

export default Button;
