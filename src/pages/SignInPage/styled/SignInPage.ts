import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import LinkButton from "../../../uikit/LinkButton";

export const SignInBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const SignInForm = styled("form")(({ theme }) => ({
  width: "40%",
  marginBottom: theme.spacing(2),

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

export const SignUpLink = styled(LinkButton)({
  textTransform: "none",
});
