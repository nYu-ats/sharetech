import { useState } from "react";
import { PointerHandler, UsePointerProps } from "./usePointer.type";

const usePointer = (props: UsePointerProps): [number, PointerHandler] => {
  const [current, setCurrent] = useState(0);
  const limit = props.limit;

  const switchPointer = (num: number) => {
    if (num <= limit) {
      setCurrent(num);
    }
  };

  return [
    current,
    {
      switchPointer,
    },
  ];
};

export default usePointer;
