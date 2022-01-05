import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Toolbar from "../components/dashboard/Toolbar/Toolbar";
import { userLoggedSelector } from "../modules/user";

const DashboardLayout = ({
  userLogged,
}: {
  userLogged: boolean;
}): JSX.Element => {
  if (!userLogged) return <Navigate to={"/signin"} />;

  return (
    <>
      <Toolbar />
      <Outlet />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userLogged: userLoggedSelector(state),
});

export default connect(mapStateToProps, {})(DashboardLayout);
