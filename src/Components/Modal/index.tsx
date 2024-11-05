// src/Components/Modal.tsx

import React from "react";
import { ModalOverlay, ModalContent, CloseButton } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen || !trailerUrl) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <iframe
          width="100%"
          height="400"
          src={trailerUrl}
          title="Trailer"
          // frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
