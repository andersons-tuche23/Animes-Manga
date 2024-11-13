import React from "react";
import { ModalOverlay, ModalContent } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl?: string | null; 
  children?: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trailerUrl, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        {children ? (
          children
        ) : trailerUrl ? (
          <iframe
            width="100%"
            height="400"
            src={trailerUrl}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : null}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
