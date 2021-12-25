import { connect } from "react-redux";
import { HeaderAppBar, HeaderTitle, HeaderToolbar } from "./styled/Header";
import LinkButton from "../../uikit/LinkButton/LinkButton";
import { userLoggedSelector } from "../../modules/user";
import { Dispatch } from "@reduxjs/toolkit";
import { HeaderPropsT } from "./types/Header.types";

const Header = (props: HeaderPropsT): JSX.Element => {
  const { userLogged } = props;

  return (
    <HeaderAppBar position={"static"}>
      <HeaderToolbar>
        <HeaderTitle to={"/"} variant={"h6"} color={"inherit"}>
          Party Manager
        </HeaderTitle>
        {userLogged ? (
          <LinkButton to={"/logout"} color={"inherit"}>
            Logout
          </LinkButton>
        ) : (
          <>
            <LinkButton to={"/signin"} variant={"text"} color={"inherit"}>
              Sign In
            </LinkButton>
            <LinkButton to={"/signup"} variant={"text"} color={"inherit"}>
              Sign Up
            </LinkButton>
          </>
        )}
      </HeaderToolbar>
    </HeaderAppBar>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
