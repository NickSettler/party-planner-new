import { connect } from "react-redux";
import useSignUpPage from "./useSignUpPage";
import { SignUpPagePropsT } from "./types/SignUpPage.types";
import { userLoggedSelector } from "../../modules/user";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import {
  SignInLink,
  SignUpActions,
  SignUpBox,
  SignUpForm,
} from "./styled/SignUpPage";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
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
    <Container>
      <SignUpBox>
        <SignUpForm onSubmit={handleSubmit}>
          <Card>
            <CardHeader title={"Sign Up"} />
            <CardContent>
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
            </CardContent>
            <SignUpActions>
              <Button
                type={"submit"}
                color={"secondary"}
                variant={"text"}
                disabled={signUpRequestLoading}
              >
                Sign Up
              </Button>
            </SignUpActions>
          </Card>
        </SignUpForm>
        <Typography>
          If you already have an account, please{" "}
          <SignInLink to={"/signin"}>sign in</SignInLink>
        </Typography>
      </SignUpBox>
    </Container>
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
