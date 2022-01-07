import { connect } from "react-redux";
import MiHidden from "../../../uikit/MiHidden";
import { Drawer, Link, ListItemText, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AccountStyle,
  ListItemIconStyle,
  ListItemStyled,
} from "./styled/Sidebar.styled";
import Avatar from "@mui/material/Avatar";
import { userInfoSelector } from "../../../modules/user";
import { DrawerContentPropsT, SidebarPropsT } from "./Sidebar.types";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import sidebarMenu from "../../../helpers/menu/sidebarMenu";
import { MenuItemT } from "../../../helpers/menu/menu.types";

const SIDEBAR_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
}));

const DrawerContentPure = ({ userInfo }: DrawerContentPropsT): JSX.Element => {
  const location = useLocation();

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

      <Box>
        <List disablePadding>
          {sidebarMenu.map((menuItem: MenuItemT) => (
            <ListItemStyled
              to={menuItem.link!}
              key={menuItem.link!}
              active={location.pathname === menuItem.link}
            >
              {menuItem.icon && (
                <ListItemIconStyle>{menuItem.icon}</ListItemIconStyle>
              )}
              <ListItemText primary={menuItem.title} />
            </ListItemStyled>
          ))}
        </List>
      </Box>
    </>
  );
};

const mapStateToDrawerProps = (state: any) => ({
  userInfo: userInfoSelector(state),
});

const DrawerContent = connect(mapStateToDrawerProps, {})(DrawerContentPure);

const Sidebar = ({ open, onClose }: SidebarPropsT): JSX.Element => {
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
      <MiHidden width={"lgUp"}>
        <Drawer
          open={open}
          onClose={onClose}
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
