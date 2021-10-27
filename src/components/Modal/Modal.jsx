import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ onModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {window.removeEventListener('keydown', handleEscape)}
  });

  const handleEscape = e => {
    if (e.code === 'Escape') {
      onModal();
    }
  };

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
    onModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}
