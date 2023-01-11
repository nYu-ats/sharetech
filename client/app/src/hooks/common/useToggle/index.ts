import { useCallback, useState } from "react";
import { UseToggleProps, ToggleHandler } from "./useToggle.type";

const useToggle = (props: UseToggleProps): [boolean, ToggleHandler] => {
  const [isActive, setActive] = useState(false);

  const changeActive = useCallback(() => {
    const next = !isActive;
    setActive(next);
  }, []);

  return [
    isActive,
    {
      changeActive,
    },
  ];
};

export default useToggle;
