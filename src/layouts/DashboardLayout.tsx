import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Toolbar from "../components/dashboard/Toolbar/Toolbar";
import { userLoggedSelector } from "../modules/user";
import Sidebar from "../components/dashboard/Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import { Suspense, useState } from "react";
import Preloader from "../components/dashboard/Preloader";

const RootStyle = styled("div")({
  minHeight: "100%",
  display: "flex",
});

const MainStyle = styled("div")(({ theme }) => ({
  minHeight: "100%",
  flexGrow: 1,
  paddingTop: `calc(${
    theme.dashboard.appBar.height.desktop
  }px + ${theme.spacing(2)})`,
}));

const DashboardLayout = ({
  userLogged,
}: {
  userLogged: boolean;
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  if (!userLogged) return <Navigate to={"/signin"} />;

  return (
    <RootStyle>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Toolbar onOpenSidebar={() => setOpen(true)} />
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
