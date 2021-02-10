import React from 'react';

import classes from './Layout.css';
import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = ({ children }) => {
  return (
    <Auxiliary>
      <Toolbar />
      <main className={classes.Content}>{children}</main>
    </Auxiliary>
  );
};

export default Layout;
