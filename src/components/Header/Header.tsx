import { connect } from "react-redux";
import {
  HeaderAppBar,
  HeaderTitle,
  HeaderToolbar,
} from "./styled-components/Header";
import LinkButton from "../../uikit/LinkButton/LinkButton";

const Header = (): JSX.Element => {
  return (
    <HeaderAppBar position={"static"}>
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
    </HeaderAppBar>
  );
};

export default connect(null, null)(Header);
