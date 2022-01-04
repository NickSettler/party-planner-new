import { Outlet } from "react-router-dom";
import Toolbar from "../components/dashboard/Toolbar/Toolbar";

const DashboardLayout = (): JSX.Element => {
  return (
    <>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
