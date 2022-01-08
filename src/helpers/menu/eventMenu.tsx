import { MenuItemT } from "./menu.types";
import BarChartIcon from "@mui/icons-material/BarChart";
import EventIcon from "@mui/icons-material/Event";

const eventTabMenu: Array<MenuItemT> = [
  {
    title: "Home",
    link: "/dashboard/events/:id/home",
    icon: <BarChartIcon />,
  },
  {
    title: "Members",
    link: "/dashboard/events/:id/members",
    icon: <EventIcon />,
  },
];

export const generateEventTabMenu = (id: number | string): Array<MenuItemT> =>
  eventTabMenu.map((menuItem) => {
    menuItem.link = menuItem.link?.replace(":id", `${id}`);
    return menuItem;
  });

export const generateEventLink = (
  id: number | string,
  menuItemIndex: number
): string =>
  (eventTabMenu[menuItemIndex]
    ? eventTabMenu[menuItemIndex]
    : eventTabMenu[0]
  ).link?.replace(":id", `${id}`) || "/";

export default eventTabMenu;
