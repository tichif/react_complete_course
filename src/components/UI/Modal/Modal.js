import React from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, show, modalClosed }) => {
  return (
    <Auxiliary>
      <Backdrop show={show} click={modalClosed} />
      <div
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
        className={classes.Modal}
      >
        {children}
      </div>
    </Auxiliary>
  );
};

export default Modal;
