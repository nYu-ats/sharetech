import { useEffect, useState } from "react";

export const useModal = (id: string) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const createElement = (id: string): HTMLElement => {
    const el = document.createElement("div");
    el.setAttribute("id", id);
    return el;
  };

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(`#${id}`) ?? createElement(id);
    document.body.appendChild(element);
    setElement(element);
  }, []);

  return element;
};
