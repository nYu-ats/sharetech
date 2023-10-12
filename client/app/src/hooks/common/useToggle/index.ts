import { useCallback, useState } from "react";
import { UseToggleProps, ToggleHandler } from "./type";

const useToggle = (props: UseToggleProps): [boolean, ToggleHandler] => {
  const [isActive, setActive] = useState(false);

  const toggle = useCallback(() => {
    const next = !isActive;
    setActive(next);
  }, [isActive]);

  return [
    isActive,
    {
      toggle,
    },
  ];
};

export default useToggle;
