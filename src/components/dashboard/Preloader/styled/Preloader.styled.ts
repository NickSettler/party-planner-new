import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";

export const StyledPopper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.background.default, 0.8),
}));
