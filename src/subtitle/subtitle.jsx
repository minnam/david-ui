/**
 * modules/subtitle/subtitle.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React from 'react'
import { classes, stylesheet } from 'typestyle'

/* <Subtitle /> ================================================================================= */
const Subtitle = (props: {
  icon: *,
  label: *
}) => {
  const {
    icon,
    label
  } = props

  return (
    <div className={ CLASSNAMES.subtitleWrapper }>
      <i
        className={classes(
          'material-icons',
          CLASSNAMES.icon
        )}
      >
        {icon}
      </i>
      <span className={ CLASSNAMES.span }>
        {label}
      </span>
    </div>
  )
}
export default Subtitle

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  subtitleWrapper: {
    paddingBottom: 8,
    borderBottom: '1px solid #e6e6e6',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
    color: '#f080a2'
  },
  span: {
    fontSize: 15,
    fontWeight: 600,
    width: '100%'
  }
})