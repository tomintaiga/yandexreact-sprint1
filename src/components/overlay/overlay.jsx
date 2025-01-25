import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import curCss from './overlay.module.css';

const Overlay = ({ isOpen, onClose, children }) => {
    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
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

    return (
        isOpen && (
            <div className={curCss.overlay} onClick={handleClick}>
                {children}
            </div>
        )
    );
};

Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Overlay;