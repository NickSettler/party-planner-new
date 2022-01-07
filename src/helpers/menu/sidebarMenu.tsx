import { MenuItemT } from "./menu.types";
import BarChartIcon from "@mui/icons-material/BarChart";
import EventIcon from "@mui/icons-material/Event";

const sidebarMenu: Array<MenuItemT> = [
  {
    title: "Dashboard",
    link: "/dashboard/app",
    icon: <BarChartIcon />,
  },
  {
    title: "Events",
    link: "/dashboard/events",
    icon: <EventIcon />,
  },
];

export default sidebarMenu;
