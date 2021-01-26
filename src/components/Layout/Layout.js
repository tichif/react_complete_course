import React from 'react'

import Auxiliary from '../../hoc/Auxiliary'

const Layout = ({ children }) => {
  return (
    <Auxiliary>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {children}
      </main>
    </Auxiliary>
  )
}

export default Layout
