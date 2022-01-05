import { CircularProgress } from "@mui/material";
import { StyledPopper } from "./styled/Preloader.styled";

const Preloader = (): JSX.Element => {
  return (
    <StyledPopper open>
      <CircularProgress />
    </StyledPopper>
  );
};

export default Preloader;
