import React from 'react';

import classes from './Logo.css';
import LogoBurger from '../assets/images/logo.png';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={LogoBurger} alt='Logo' />
    </div>
  );
};

export default Logo;
