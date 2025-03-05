import React from 'react';
import curStyle from './modal-overlay.module.css';

interface IModalOverlay {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({
  children,
  isOpen,
  onClose,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className={curStyle.overlay} onClick={handleClick}>
        {children}
      </div>
    )
  );
};

export default ModalOverlay;
