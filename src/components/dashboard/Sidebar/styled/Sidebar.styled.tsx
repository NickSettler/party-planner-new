import { styled, alpha } from "@mui/material/styles";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { Link, LinkProps } from "react-router-dom";
import { ListItemIcon } from "@mui/material";

export const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

export const ListItemStyled = styled(
  (props: ListItemButtonProps & LinkProps) => (
    <ListItemButton component={Link as any} {...props} />
  ),
  {
    shouldForwardProp: (prop: PropertyKey) => prop !== "active",
  }
)<{ active?: boolean } & ListItemButtonProps>(({ theme, active }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  ...(active && {
    backgroundColor: alpha(
      theme.palette.primary.dark,
      theme.palette.action.selectedOpacity
    ),
    "& span": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& *": { color: theme.palette.primary.dark },
  }),

  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: active ? "block" : "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const ListItemIconStyle = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 22,
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
}));
