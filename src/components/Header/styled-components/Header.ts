import { styled } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import LinkTypography from "../../../uikit/LinkTypography";

export const HeaderToolbar = styled(Toolbar)({
  alignItems: "center",
});

export const HeaderTitle = styled(LinkTypography)({
  flexGrow: 1,
  cursor: "pointer",
  userSelect: "none",
});
