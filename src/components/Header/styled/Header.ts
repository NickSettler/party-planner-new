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
  cursor: "pointer",
  userSelect: "none",
});

export const HeaderSpacer = styled("div")({
  flexGrow: 1,
});
