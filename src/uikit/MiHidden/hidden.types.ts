import { Breakpoint } from "@mui/material";

type HiddenWidthProp = `${Breakpoint}${"Down" | "Up"}`;

export type HiddenPropsT = {
  width: HiddenWidthProp;
  children?: JSX.Element;
};
