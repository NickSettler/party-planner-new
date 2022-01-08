import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

export const EventsTableToolbar = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 3, 0, 3),
}));

export const SearchTextField = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  maxWidth: "100%",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: "1px !important",
    borderColor: `${theme.palette.grey[500]} !important`,
  },
}));

export const EmptyIllustration = styled(Box)(() => {
  const size = 240;
  return {
    width: size,
    maxWidth: size,
  };
});
