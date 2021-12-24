import { LinkTypographyPropsT } from "./types/LinkButton.types";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Typography from "@mui/material/Typography";

const LinkTypography = (props: LinkTypographyPropsT): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(props.to);
  }, [navigate, props]);

  return (
    <Typography onClick={handleClick} {...props}>
      {props.children}
    </Typography>
  );
};

export default LinkTypography;
