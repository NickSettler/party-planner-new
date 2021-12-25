import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";

export const SignInBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const SignInForm = styled("form")(({ theme }) => ({
  width: "40%",

  [theme.breakpoints.down("md")]: {
    width: "80%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const SignInActions = styled(CardActions)({
  justifyContent: "flex-end",
});
