import { connect } from "react-redux";
import MiHidden from "../../../uikit/MiHidden";
import { RootStyle, ToolbarStyle } from "./styled/Toolbar.styled";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccountDropdown from "../AccountDropdown/AccountDropdown";
import { ToolbarPropsT } from "./Toolbar.types";

const Toolbar = ({ onOpenSidebar }: ToolbarPropsT): JSX.Element => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MiHidden width={"lgUp"}>
          <IconButton
            color={"inherit"}
            onClick={onOpenSidebar}
            aria-label={"Navigation menu"}
          >
            <Menu />
          </IconButton>
        </MiHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction={"row"}>
          <AccountDropdown />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default connect()(Toolbar);
