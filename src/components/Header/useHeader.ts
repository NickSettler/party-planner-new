import { HeaderHookT, HeaderPropsT } from "./types/Header.types";
import { useCallback } from "react";

const useHeader = ({ runSignOut }: HeaderPropsT): HeaderHookT => {
  const handleSignOutClick = useCallback(() => {
    runSignOut();
  }, [runSignOut]);

  return {
    handleSignOutClick,
  };
};

export default useHeader;
