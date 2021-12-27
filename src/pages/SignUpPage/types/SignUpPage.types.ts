import React from "react";
import { FormikErrors } from "formik";

export type SignUpPagePropsT = {
  userLogged: boolean;
  signUpRequestLoading: boolean;
  signUpRequestFailed: boolean;
  signUpRequestError: string;
  runSignUpRequest: (email: string, password: string, name: string) => void;
};

export type SignUpPageHookT = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  errors: FormikErrors<any>;
  validateField: (fieldName: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
