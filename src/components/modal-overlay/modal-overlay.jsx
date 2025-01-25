import React from 'react';
import PropTypes from 'prop-types';
import curCss from './modal-overlay.module.css';

const ModalOverlay = ({ isOpen, onClose, children }) => {
    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        isOpen && (
            <div className={curCss.overlay} onClick={handleClick}>
                {children}
            </div>
        )
    );
};

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default ModalOverlay;