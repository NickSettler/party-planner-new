import useSignInPage from "./useSignInPage";
import { SignInPagePropsT } from "./types/SignInPage.types";
import { connect } from "react-redux";
import {
  runSignInRequest,
  signInRequestErrorSelector,
  signInRequestFailedSelector,
  signInRequestLoading,
} from "../../modules/auth";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import {
  SignInBox,
  SignInContentSection,
  SignInIllustrationCard,
} from "./styled/SignInPage";
import { userLoggedSelector } from "../../modules/user";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UnlockImage from "../../assets/illustrations/unlock.svg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Hidden from "../../components/general/Hidden";

const SignInPage = (props: SignInPagePropsT): JSX.Element => {
  const { signInRequestLoading, signInRequestFailed, signInRequestError } =
    props;

  const {
    emailState,
    passwordState,
    errors,
    handleFocus,
    handleChange,
    handleSubmit,
  } = useSignInPage(props);

  if (props.userLogged) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <SignInBox>
        <Hidden width={"mdDown"}>
          <SignInIllustrationCard>
            <Box component={"img"} src={UnlockImage} />
          </SignInIllustrationCard>
        </Hidden>
        <Container maxWidth={"sm"}>
          <SignInContentSection>
            <Stack sx={{ mb: 5 }}>
              <Typography variant={"h4"} gutterBottom>
                Sign In
              </Typography>
              <Typography variant={"body1"}>
                Enter your details below.
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack>
                <TextField
                  type={"email"}
                  label={"Email"}
                  name={"email"}
                  value={emailState}
                  onChange={handleChange}
                  fullWidth
                  autoComplete={"email"}
                  onFocus={handleFocus}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={signInRequestLoading}
                />
                <TextField
                  type={"password"}
                  label={"Password"}
                  name={"password"}
                  value={passwordState}
                  onChange={handleChange}
                  fullWidth
                  margin={"normal"}
                  autoComplete={"current-password"}
                  onFocus={handleFocus}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={signInRequestLoading}
                />
                {signInRequestFailed && (
                  <Typography color={"error"} variant={"body2"}>
                    {signInRequestError}
                  </Typography>
                )}
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  type={"submit"}
                  disabled={signInRequestLoading}
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </SignInContentSection>
        </Container>
      </SignInBox>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
  signInRequestLoading: signInRequestLoading(state),
  signInRequestFailed: signInRequestFailedSelector(state),
  signInRequestError: signInRequestErrorSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  runSignInRequest: (email: string, password: string) =>
    dispatch(runSignInRequest(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
