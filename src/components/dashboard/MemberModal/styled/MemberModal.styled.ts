import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";

export const MemberGlassDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(255,255,255,0.4)",
    backdropFilter: "blur(2px)",
  },

  "& .MuiDialog-paper": {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    boxShadow: theme.customShadows.z20,
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.72)",
  },
}));
