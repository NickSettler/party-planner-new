import { connect } from "react-redux";
import useSignUpPage from "./useSignUpPage";
import { SignUpPagePropsT } from "./types/SignUpPage.types";
import { userLoggedSelector } from "../../modules/user";
import { Link as RouterLink, Navigate } from "react-router-dom";
import {
  SignUpBox,
  SignUpContentSection,
  SignUpIllustrationCard,
} from "./styled/SignUpPage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import Typography from "@mui/material/Typography";
import {
  runSignUpRequest,
  signUpRequestErrorSelector,
  signUpRequestFailedSelector,
  signUpRequestLoadingSelector,
} from "../../modules/auth";
import MiHidden from "../../uikit/MiHidden";
import Box from "@mui/material/Box";
import UnlockImage from "../../assets/illustrations/unlock.svg";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import AuthLayout from "../../layouts/AuthLayout";
import { Link } from "@mui/material";

const SignUpPage = (props: SignUpPagePropsT): JSX.Element => {
  const {
    userLogged,
    signUpRequestError,
    signUpRequestFailed,
    signUpRequestLoading,
  } = props;

  const {
    email,
    password,
    confirmPassword,
    username,
    errors,
    validateField,
    handleChange,
    handleSubmit,
  } = useSignUpPage(props);

  if (userLogged) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <AuthLayout>
        <>
          Already have an account? &nbsp;{" "}
          <Link
            to={"/signin"}
            component={RouterLink}
            underline={"none"}
            color={"secondary"}
            variant={"subtitle2"}
          >
            Login
          </Link>
        </>
      </AuthLayout>
      <SignUpBox>
        <MiHidden width={"mdDown"}>
          <SignUpIllustrationCard>
            <Box component={"img"} src={UnlockImage} />
          </SignUpIllustrationCard>
        </MiHidden>
        <Container maxWidth={"sm"}>
          <SignUpContentSection>
            <Stack sx={{ mb: 5 }}>
              <Typography variant={"h4"} gutterBottom>
                Sign Up
              </Typography>
              <Typography variant={"body1"}>
                Enter your details below.
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack>
                <TextField
                  type={"email"}
                  name={"email"}
                  value={email}
                  onBlur={() => validateField("email")}
                  onChange={handleChange}
                  label={"Email"}
                  fullWidth
                  margin={"dense"}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete={"email"}
                  disabled={signUpRequestLoading}
                />
                <TextField
                  type={"text"}
                  name={"username"}
                  value={username}
                  onBlur={() => validateField("username")}
                  onChange={handleChange}
                  label={"Username"}
                  fullWidth
                  margin={"dense"}
                  error={!!errors.username}
                  helperText={errors.username}
                  autoComplete={"username"}
                  disabled={signUpRequestLoading}
                />
                <TextField
                  type={"password"}
                  name={"password"}
                  value={password}
                  onBlur={() => validateField("password")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    validateField("password");
                    validateField("confirmPassword");
                  }}
                  label={"Password"}
                  fullWidth
                  margin={"dense"}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete={"new-password"}
                  disabled={signUpRequestLoading}
                />
                <TextField
                  type={"password"}
                  name={"confirmPassword"}
                  value={confirmPassword}
                  onBlur={() => validateField("confirmPassword")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    validateField("password");
                    validateField("confirmPassword");
                  }}
                  label={"Password Confirmation"}
                  fullWidth
                  margin={"dense"}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  autoComplete={"new-password"}
                  disabled={signUpRequestLoading}
                />
                {signUpRequestFailed && (
                  <Typography color={"error"}>{signUpRequestError}</Typography>
                )}
                <Button
                  type={"submit"}
                  color={"secondary"}
                  variant={"contained"}
                  disabled={signUpRequestLoading}
                  sx={{ mt: 0.5 }}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </SignUpContentSection>
        </Container>
      </SignUpBox>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
  signUpRequestLoading: signUpRequestLoadingSelector(state),
  signUpRequestFailed: signUpRequestFailedSelector(state),
  signUpRequestError: signUpRequestErrorSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  runSignUpRequest: (email: string, password: string, name: string) =>
    dispatch(runSignUpRequest(email, password, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
