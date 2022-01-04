import { connect } from "react-redux";
import MiHidden from "../../../uikit/MiHidden";
import { ToolbarStyle } from "./styled/Toolbar.styled";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccountDropdown from "../AccountDropdown/AccountDropdown";

const Toolbar = (): JSX.Element => {
  return (
    <>
      <ToolbarStyle>
        <MiHidden width={"lgUp"}>
          <IconButton color={"inherit"}>
            <Menu />
          </IconButton>
        </MiHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction={"row"}>
          <AccountDropdown />
        </Stack>
      </ToolbarStyle>
    </>
  );
};

export default connect()(Toolbar);
