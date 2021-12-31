import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import LinkTypography from "../../../uikit/LinkTypography";
import AppBar from "@mui/material/AppBar";

export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(2),
  zIndex: theme.zIndex.drawer + 1,
}));

export const HeaderToolbar = styled(Toolbar)({
  alignItems: "center",
});

export const HeaderTitle = styled(LinkTypography)({
  cursor: "pointer",
  userSelect: "none",
});

export const HeaderSpacer = styled("div")({
  flexGrow: 1,
});
