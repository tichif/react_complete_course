import React from 'react';

import classes from './NavigationItem.css';

const NavigationItem = ({ children, link, active }) => {
  return (
    <li className={classes.NavigationItem}>
      {' '}
      <a className={active ? classes.active : null} href={link}>
        {children}
      </a>
    </li>
  );
};

export default NavigationItem;
