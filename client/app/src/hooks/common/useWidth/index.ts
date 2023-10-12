import useResizeObserver from "@react-hook/resize-observer";
import { ReactNode, RefObject, useLayoutEffect, useState } from "react";

const useWidth = (target: RefObject<HTMLElement>) => {
  const [width, setwidth] = useState(0);

  useLayoutEffect(() => {
    if (target.current !== null) {
      setwidth(target.current.getBoundingClientRect().width);
    }
  });

  useResizeObserver(target, (entry) => setwidth(entry.contentRect.width));

  return width;
};

export default useWidth;
