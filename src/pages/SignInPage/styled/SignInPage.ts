import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import LinkButton from "../../../uikit/LinkButton";
import Card from "@mui/material/Card";

export const SignInBox = styled(Box)({
  width: "100%",
  display: "flex",
});

export const SignInIllustrationCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),

  "& img": {
    width: "100%",
    maxWidth: "calc(100% - 64px)",
    height: "auto",
  },
}));

export const SignInContentSection = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
  [theme.breakpoints.up("md")]: {
    justifyContent: "center",
  },
}));

export const SignInForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

export const SignInActions = styled(CardActions)({
  justifyContent: "flex-end",
});

export const SignUpLink = styled(LinkButton)({
  textTransform: "none",
});
