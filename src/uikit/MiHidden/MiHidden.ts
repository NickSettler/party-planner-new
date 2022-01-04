import { HiddenPropsT } from "./hidden.types";
import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

const MiHidden = ({ width, children }: HiddenPropsT): JSX.Element | null => {
  const breakpoint = width.substring(0, 2) as Breakpoint;

  const hiddenUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes("Down"))
    return hiddenDown ? null : (children as JSX.Element);
  if (width.includes("Up")) return hiddenUp ? null : (children as JSX.Element);

  return null;
};

export default MiHidden;
