import {
  AccountDropdownHookT,
  AccountDropdownPropsT,
} from "./AccountDropdown.types";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAccountDropdown = (
  props: AccountDropdownPropsT
): AccountDropdownHookT => {
  const navigate = useNavigate();

  const popoverRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(
    (_open: boolean = !open) => {
      setOpen(_open);
    },
    [open]
  );

  const navigateTo = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  return {
    popoverRef,
    open,
    toggleOpen,
    navigateTo,
  };
};

export default useAccountDropdown;
