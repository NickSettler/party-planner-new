import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { HeaderTitle, HeaderToolbar } from "./styled-components/Header";
import LinkButton from "../../uikit/LinkButton/LinkButton";

const Header = (): JSX.Element => {
  return (
    <AppBar position={"static"}>
      <HeaderToolbar>
        <HeaderTitle to={"/"} variant={"h6"} color={"inherit"}>
          Party Manager
        </HeaderTitle>
        <LinkButton to={"/signin"} variant={"text"} color={"inherit"}>
          Sign In
        </LinkButton>
        <LinkButton to={"/signup"} variant={"text"} color={"inherit"}>
          Sign Up
        </LinkButton>
      </HeaderToolbar>
    </AppBar>
  );
};

export default connect(null, null)(Header);
