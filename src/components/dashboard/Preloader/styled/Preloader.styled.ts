import { styled } from "@mui/material/styles";
import { alpha, Popper } from "@mui/material";

export const StyledPopper = styled(Popper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.background.default, 0.8),
}));
