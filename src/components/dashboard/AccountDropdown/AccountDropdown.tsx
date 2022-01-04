import { Avatar, MenuItem, Popover } from "@mui/material";
import AvatarImage from "../../../assets/images/avatar_default.jpg";
import IconButton from "@mui/material/IconButton";
import {
  AccountDropdownMenuItem,
  AccountDropdownPropsT,
} from "./AccountDropdown.types";
import useAccountDropdown from "./useAccountDropdown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Dispatch } from "@reduxjs/toolkit";
import { runSignOutRequest } from "../../../modules/auth";
import { connect } from "react-redux";

const MENU_OPTIONS: Array<AccountDropdownMenuItem> = [
  {
    label: "Profile",
    link: "/dashboard/profile",
  },
];

const AccountDropdown = (props: AccountDropdownPropsT): JSX.Element => {
  const { signOut } = props;

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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => dispatch(runSignOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown);
