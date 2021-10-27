import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    let condition = e.code === 'Escape';
    if (condition) {
      this.props.onModal();
    }
  };

  handleClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onModal();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClose}>
        <div className={s.Modal}>{children}</div>
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}
