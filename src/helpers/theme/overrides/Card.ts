import { alpha, Components, Theme } from "@mui/material";

const Card = (theme: Theme): Components => {
  const transparent = alpha(theme.palette.grey["500"], 0.24);

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 0 2px 0 ${transparent}, 0 16px 32px -4px ${transparent}`,
          borderRadius: 12,
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
  };
};

export default Card;
