import { Outlet } from "react-router-dom";
import React from "react";
import MiHidden from "../uikit/MiHidden";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const HeaderElement = styled("header")(({ theme }) => ({
  top: 0,
  right: 0,
  zIndex: theme.zIndex.appBar + 1,
  lineHeight: 0,
  width: "auto",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "flex-end",

  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Outlet />
      <HeaderElement>
        <MiHidden width={"smDown"}>
          <Typography variant={"body2"}>{children}</Typography>
        </MiHidden>
      </HeaderElement>
    </>
  );
};

export default AuthLayout;
