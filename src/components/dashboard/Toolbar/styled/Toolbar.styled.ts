import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,

  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
