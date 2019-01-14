/**
 * modules/toolbar/toolbar-break.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 * @flow
 */
import * as React from 'react'
import { stylesheet } from 'typestyle'

/* <ToolbarBreak /> ============================================================================= */
const ToolbarBreak = ({ style }) => (
  <span
    className={CLASSNAMES.toolbarBreak}
    style={style}
  />
)
export default ToolbarBreak

/* Styles ======================================================================================== */
const CLASSNAMES = stylesheet({
  toolbarBreak: {
    background: 'rgb(228, 228, 228)',
    display: 'inline-block',
    float:'left',
    height: 30,
    marginLeft: 15,
    marginRight: 5,
    width: 2
  }
})