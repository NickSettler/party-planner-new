import { CircularProgress } from "@mui/material";
import { StyledPopper } from "./styled/Preloader.styled";

const Preloader = (): JSX.Element => {
  return (
    <StyledPopper>
      <CircularProgress />
    </StyledPopper>
  );
};

export default Preloader;
