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
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { SignInActions, SignInBox, SignInForm } from "./styled/SignInPage";
import { userLoggedSelector } from "../../modules/user";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

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
    <Container>
      <SignInBox>
        <SignInForm onSubmit={handleSubmit}>
          <Card variant={"elevation"}>
            <CardHeader title={"Sign In"} />
            <CardContent>
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
            </CardContent>
            <SignInActions>
              <Button
                color={"secondary"}
                type={"submit"}
                disabled={signInRequestLoading}
              >
                Sign In
              </Button>
            </SignInActions>
          </Card>
        </SignInForm>
      </SignInBox>
    </Container>
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
