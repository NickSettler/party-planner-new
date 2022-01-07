export type CustomShadowsKeys =
  | "z1"
  | "z8"
  | "z12"
  | "z16"
  | "z20"
  | "z24"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export type CustomShadows = Record<CustomShadowsKeys, string>;

type ResponsiveSize<K extends string> = {
  [key in K]: number | string;
};

type AppBar = {
  height: ResponsiveSize<"desktop" | "mobile">;
};

type Drawer = {
  width: number;
};

export type Dashboard = {
  appBar: AppBar;
  drawer: Drawer;
};
