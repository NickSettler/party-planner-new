import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  AccountDropdownMenuItem,
  AccountDropdownPropsT,
} from "./AccountDropdown.types";
import AvatarImage from "../../../assets/images/avatar_default.jpg";
import useAccountDropdown from "./useAccountDropdown";
import { Dispatch } from "@reduxjs/toolkit";
import { runSignOutRequest } from "../../../modules/auth";
import { connect } from "react-redux";
import { userInfoSelector } from "../../../modules/user";

const MENU_OPTIONS: Array<AccountDropdownMenuItem> = [
  {
    label: "Profile",
    link: "/dashboard/profile",
  },
];

const AccountDropdown = (props: AccountDropdownPropsT): JSX.Element => {
  const { signOut, userInfo } = props;

  const { popoverRef, open, toggleOpen, navigateTo } =
    useAccountDropdown(props);

  return (
    <>
      <IconButton disableRipple ref={popoverRef} onClick={() => toggleOpen()}>
        <Avatar src={AvatarImage} sizes={"40px"} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={popoverRef.current}
        onClose={() => toggleOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {userInfo && (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant={"subtitle2"} noWrap>
                {userInfo.first_name} {userInfo.last_name}
              </Typography>
              <Typography
                variant={"body2"}
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {userInfo.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />
          </>
        )}

        {MENU_OPTIONS.map((menuItem, i) => (
          <MenuItem
            key={i}
            onClick={() => navigateTo(menuItem.link)}
            sx={{
              typography: "body2",
              px: 2.5,
              py: 1,
            }}
          >
            {menuItem.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            variant={"outlined"}
            fullWidth
            color={"inherit"}
            onClick={signOut}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: userInfoSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => dispatch(runSignOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown);
