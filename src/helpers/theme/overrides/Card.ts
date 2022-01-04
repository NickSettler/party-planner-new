import { Components, Theme } from "@mui/material";

const Card = (theme: Theme): Components => ({
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: theme.customShadows.z16,
        borderRadius: theme.shape.borderRadiusMd,
        position: "relative",
        zIndex: 0,
      },
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {
        variant: "h6",
      },
      subheaderTypographyProps: {
        variant: "body2",
      },
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 0),
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
      },
    },
  },
});

export default Card;
