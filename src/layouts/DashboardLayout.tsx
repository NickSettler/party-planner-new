import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Toolbar from "../components/dashboard/Toolbar/Toolbar";
import { userLoggedSelector } from "../modules/user";
import { styled } from "@mui/material/styles";
import { Suspense } from "react";
import Preloader from "../components/dashboard/Preloader";

const RootStyle = styled("div")({
  minHeight: "100%",
  display: "flex",
});

const MainStyle = styled("div")(() => ({
  minHeight: "100%",
  flexGrow: 1,
}));

const DashboardLayout = ({
  userLogged,
}: {
  userLogged: boolean;
}): JSX.Element => {
  if (!userLogged) return <Navigate to={"/signin"} />;

  return (
    <RootStyle>
      <Toolbar />
      <Suspense fallback={Preloader()}>
        <MainStyle>
          <Outlet />
        </MainStyle>
      </Suspense>
    </RootStyle>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
});

export default connect(mapStateToProps, {})(DashboardLayout);
