import React from 'react';

import classes from './Backdrop.css';

const Backdrop = ({ show, click }) =>
  show ? <div onClick={click} className={classes.Backdrop}></div> : null;
export default Backdrop;
