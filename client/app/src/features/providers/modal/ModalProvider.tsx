import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProviderProps, ModalContextProps } from "./ModalProvider.type";
import { useModal } from "hooks/common/useModal";
import ModalOverlay from "components/molecules/modal/ModalOverlay";

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalNode, setModalNode] = useState<ReactNode>();
  const [showModal, setShowModal] = useState(false);

  const modalContainer = useModal("modal");

  const openModal = (modalComponent: ReactNode) => {
    setShowModal(true);
    setModalNode(<ModalOverlay>{modalComponent}</ModalOverlay>);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalNode(null);
  };

  if (!modalContainer) {
    return null;
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, showModal }}>
      {children}
      {createPortal(modalNode, modalContainer)}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
