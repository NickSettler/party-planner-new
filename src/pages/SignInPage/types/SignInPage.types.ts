import React from "react";
import { FormikErrors } from "formik";

export type SignInPagePropsT = {
  userLogged: boolean;
  signInRequestLoading: boolean;
  signInRequestFailed: boolean;
  signInRequestError: string;
  runSignInRequest: (email: string, password: string) => void;
};

export type SignInPageHookT = {
  emailState: string;
  passwordState: string;
  errors: FormikErrors<any>;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
