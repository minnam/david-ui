/**
 * modules/toolbar/toolbar-title.jsx
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
import { Link } from 'react-router-dom'

/* <ToolbarTitle /> ============================================================================= */
const ToolbarTitle = (props: {
  onClick: () => void,
  title: string,
  to: string
}) => {
  const { onClick, title, to } = props

  if (to) {
    return <Link to={to} onClick={onClick}>{title}</Link>
  } else {
    return <span onClick={onClick}>{title}</span>
  }
}
export default ToolbarTitle