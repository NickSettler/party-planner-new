import Box, { BoxProps } from "@mui/material/Box";
import LogoSVG from "../../assets/logo.svg";

const Logo = ({ sx }: BoxProps): JSX.Element => {
  return (
    <Box
      component={"img"}
      src={LogoSVG}
      sx={{
        width: 64,
        height: 64,
        ...sx,
      }}
    />
  );
};

export default Logo;
