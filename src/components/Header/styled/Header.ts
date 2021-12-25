import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import LinkTypography from "../../../uikit/LinkTypography";
import AppBar from "@mui/material/AppBar";

export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const HeaderToolbar = styled(Toolbar)({
  alignItems: "center",
});

export const HeaderTitle = styled(LinkTypography)({
  flexGrow: 1,
  cursor: "pointer",
  userSelect: "none",
});
