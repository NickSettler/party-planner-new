import { styled } from "@mui/material/styles";
import Background from "../../../assets/images/main-background.png";
import Illustration from "../../../assets/illustrations/main-page__illustration.svg";
import Box from "@mui/material/Box";

export const MainPageBackground = styled(Box)({
  height: "100vh",
  display: "flex",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
});

export const MainPageIllustration = styled(Box)(({ theme }) => ({
  width: "40%",
  height: 400,
  backgroundImage: `url(${Illustration})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
