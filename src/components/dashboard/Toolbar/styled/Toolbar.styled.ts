import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { alpha } from "@mui/material";

export const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),

  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${theme.dashboard.drawer.width + 1}px)`,
  },
}));

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: theme.dashboard.appBar.height.mobile,

  [theme.breakpoints.up("lg")]: {
    minHeight: theme.dashboard.appBar.height.desktop,
    padding: theme.spacing(0, 5),
  },
}));
