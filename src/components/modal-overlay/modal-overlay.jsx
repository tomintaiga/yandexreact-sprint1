import PropTypes from 'prop-types';
import curStyle from './modal-overlay.module.css';

const ModalOverlay = ({ isOpen, onClose, children }) => {
  const handleClick = (event) => {
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

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
