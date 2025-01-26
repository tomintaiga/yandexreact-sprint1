import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import curStyle from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modals");

const Modal = ({ children, isOpen, onClose, title }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    if (!isOpen) {
        return null;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            // Не забыть отписаться
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return ReactDom.createPortal(
        (
            <ModalOverlay isOpen={isOpen} onClose={onClose}>
                <div className={curStyle.modal}>
                    <div className={curStyle.modal_header}>
                        <p className="text text_type_main-large">{title}</p>
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={onClose}
                        >
                            <CloseIcon type={isHovered ? 'primary' : 'secondary'} />
                        </div>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        ), modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default Modal;