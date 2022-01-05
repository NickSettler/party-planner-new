import { connect } from "react-redux";
import MiHidden from "../../../uikit/MiHidden";
import { Drawer, Link, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { AccountStyle } from "./styled/Sidebar.styled";
import Avatar from "@mui/material/Avatar";
import { userInfoSelector } from "../../../modules/user";
import { DrawerContentPropsT } from "./Sidebar.types";
import Typography from "@mui/material/Typography";

const SIDEBAR_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
}));

const DrawerContentPure = ({ userInfo }: DrawerContentPropsT): JSX.Element => {
  return (
    <>
      {userInfo ? (
        <Box sx={{ mb: 5, mt: 3, mx: 2.5 }}>
          <Link
            underline={"none"}
            component={RouterLink}
            to={"/dashboard/profile"}
          >
            <AccountStyle>
              <Avatar
                src={`${process.env.REACT_APP_API_URL}/assets/${userInfo.avatar}?key=64-64`}
                sizes={"40px"}
                variant={"circular"}
                alt={"Profile photo"}
              />
              <Box sx={{ ml: 2, overflow: "hidden" }}>
                <Typography variant={"subtitle2"} color={"text.primary"}>
                  {userInfo.first_name} {userInfo.last_name}
                </Typography>
                <Typography
                  variant={"body2"}
                  color={"text.secondary"}
                  noWrap
                  title={userInfo.email}
                >
                  {userInfo.email}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      ) : (
        <Box sx={{ mb: 5, mt: 3, mx: 2.5 }}>
          <Skeleton variant={"rectangular"} height={72} />
        </Box>
      )}
    </>
  );
};

const mapStateToDrawerProps = (state: any) => ({
  userInfo: userInfoSelector(state),
});

const DrawerContent = connect(mapStateToDrawerProps, {})(DrawerContentPure);

const Sidebar = (): JSX.Element => {
  return (
    <RootStyle>
      <MiHidden width={"lgDown"}>
        <Drawer
          open
          variant={"persistent"}
          PaperProps={{
            sx: {
              width: 280,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
      </MiHidden>
    </RootStyle>
  );
};

export default connect(null, null)(Sidebar);
