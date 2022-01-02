import { styled } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import Logo from "../uikit/Logo";

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const EmptyLayout = (): JSX.Element => {
  return (
    <>
      <StyledHeader>
        <Link to={"/"}>
          <Logo />
        </Link>
      </StyledHeader>
      <Outlet />
    </>
  );
};

export default EmptyLayout;
