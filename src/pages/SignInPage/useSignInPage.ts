import { SignInPageHookT, SignInPagePropsT } from "./types/SignInPage.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignInPage = ({
  userLogged,
  runSignInRequest,
}: SignInPagePropsT): SignInPageHookT => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) navigate("/dashboard");
  }, [navigate, userLogged]);

  const [credentialsSuggested, setCredentialsSuggested] = useState(false);

  const handleFocus = useCallback(() => {
    if (!credentialsSuggested) {
      setCredentialsSuggested(true);
      if (navigator.credentials && window.PasswordCredential)
        navigator.credentials
          .get({
            // @ts-ignore
            password: true,
            mediation: "optional",
          })
          .then((credentials) => {
            if (credentials && credentials.type === "password") {
              // @ts-ignore
              runSignInRequest(credentials.id, credentials.password!);
            }
          });
    }
  }, [credentialsSuggested, runSignInRequest]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      runSignInRequest(values.email, values.password);
    },
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  return {
    emailState: values.email,
    passwordState: values.password,
    errors,
    handleFocus,
    handleChange,
    handleSubmit,
  };
};

export default useSignInPage;
