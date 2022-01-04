import { connect } from "react-redux";
import {
  MainPageBackground,
  MainPageIllustration,
} from "./styled/MainPage.styled";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import LinkButton from "../../uikit/LinkButton";
import { userLoggedSelector } from "../../modules/user";
import { MainPagePropsT } from "./mainPage.types";

const MainPage = ({ userLogged }: MainPagePropsT): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <MainPageBackground>
        <Container sx={{ mt: `calc(104px + ${theme.spacing(4)})` }}>
          <Stack direction={"row"} spacing={4} justifyContent={"center"}>
            <Stack flexGrow={1} maxWidth={"sm"}>
              <Typography variant={"h1"} sx={{ mb: 3 }}>
                Keep events under your control
              </Typography>
              <Typography variant={"h4"} sx={{ fontWeight: 500, mb: 5 }}>
                Use our app to keep track of your events. You can add events,
                check their status, and even invite your friends to join!
              </Typography>
              <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
                <LinkButton
                  to={"/signin"}
                  variant={"contained"}
                  color={"secondary"}
                  size={"large"}
                  fullWidth
                >
                  Sign In
                </LinkButton>
                <LinkButton
                  to={"/signup"}
                  variant={"contained"}
                  color={"secondary"}
                  size={"large"}
                  fullWidth
                >
                  Sign Up
                </LinkButton>
              </Stack>
              {userLogged && (
                <>
                  <LinkButton
                    to={"/dashboard"}
                    variant={"contained"}
                    color={"secondary"}
                    size={"large"}
                    fullWidth
                  >
                    Dashboard
                  </LinkButton>
                </>
              )}
            </Stack>
            <MainPageIllustration />
          </Stack>
        </Container>
      </MainPageBackground>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
});

export default connect(mapStateToProps)(MainPage);
