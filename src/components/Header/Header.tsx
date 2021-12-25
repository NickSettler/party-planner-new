import { connect } from "react-redux";
import { HeaderAppBar, HeaderTitle, HeaderToolbar } from "./styled/Header";
import LinkButton from "../../uikit/LinkButton/LinkButton";
import { userLoggedSelector } from "../../modules/user";
import { Dispatch } from "@reduxjs/toolkit";
import { HeaderPropsT } from "./types/Header.types";
import { runSignOutRequest } from "../../modules/auth";
import useHeader from "./useHeader";
import Button from "@mui/material/Button";

const Header = (props: HeaderPropsT): JSX.Element => {
  const { userLogged } = props;

  const { handleSignOutClick } = useHeader(props);

  return (
    <HeaderAppBar position={"static"}>
      <HeaderToolbar>
        <HeaderTitle to={"/"} variant={"h6"} color={"inherit"}>
          Party Manager
        </HeaderTitle>
        {userLogged ? (
          <Button
            variant={"text"}
            color={"inherit"}
            onClick={handleSignOutClick}
          >
            Sign Out
          </Button>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  runSignOut: () => dispatch(runSignOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
