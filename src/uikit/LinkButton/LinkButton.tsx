import { LinkButtonPropsT } from "./types/LinkButton.types";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useCallback } from "react";

const LinkButton = (props: LinkButtonPropsT): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(props.to);
  }, [navigate, props]);

  return (
    <Button onClick={handleClick} {...props}>
      {props.children}
    </Button>
  );
};

export default LinkButton;
