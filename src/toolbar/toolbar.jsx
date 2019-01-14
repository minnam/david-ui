/**
 * modules/toolbar/toolbar.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import * as React from 'react'
import { stylesheet, classes } from 'typestyle'

/* <Toolbar /> ================================================================================== */
const Toolbar = (props: {
  children: [React.Node],
  fullWidth: boolean
}) => {
  return (
    <div className={classes(CLASSNAMES.toolbar, props.fullWidth ? CLASSNAMES.toolbarFullWidth : '', 'no-select')}>
      {props.children}
    </div>
  )
}
export default Toolbar

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    height: 60,
    justifyContent: 'space-between',
    left: 70,
    padding: '10.5px 15px 10.5px 15px',
    position: 'fixed',
    top: 0,
    width: 'calc(100% - 70px)',
    zIndex: 1999,
    $nest: {
      '@media print': {
        width: '100%',
        left: 0,
        position: 'relative'
      },
    }
  },
  toolbarFullWidth: {
    width: '100%',
    left: 0
  }
})