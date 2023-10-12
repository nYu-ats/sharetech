import { ReactNode } from "react";

export type ModalProviderProps = {
  children: ReactNode;
};

export type ModalContextProps = {
  openModal: (modalContent: ReactNode) => void;
  closeModal: () => void;
  showModal: boolean;
};
