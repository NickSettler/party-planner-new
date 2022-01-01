import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import React from "react";

const AuthLayout = (): JSX.Element => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
