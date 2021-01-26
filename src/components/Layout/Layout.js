import React from 'react';

import classes from './Layout.css';
import Auxiliary from '../../hoc/Auxiliary';

const Layout = ({ children }) => {
  return (
    <Auxiliary>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{children}</main>
    </Auxiliary>
  );
};

export default Layout;
