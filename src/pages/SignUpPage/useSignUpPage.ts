import { SignUpPageHookT, SignUpPagePropsT } from "./types/SignUpPage.types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const useSignUpPage = ({
  userLogged,
  runSignUpRequest,
}: SignUpPagePropsT): SignUpPageHookT => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) navigate("/dashboard");
  }, [navigate, userLogged]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      username: Yup.string().required("Required"),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      runSignUpRequest(values.email, values.password, values.username);
    },
  });

  const { handleChange, handleSubmit, errors, values, validateField } = formik;

  return {
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
    username: values.username,
    errors,
    validateField,
    handleChange,
    handleSubmit,
  };
};

export default useSignUpPage;
