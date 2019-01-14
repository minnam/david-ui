/**
 * modules/toggle/toggle.jsx
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

/* Component ==================================================================================== */
import { Button } from '..'

/* Toggle ======================================================================================= */
const Toggle = (props: {
  /** Material icon name for off state. */
  iconOff: string,
  /** Material icon name for on state. */
  iconOn: string,
  /** Toggle state. Toggled on if true; off if false. */
  toggled: boolean
}) => {
  const {
    iconOff,
    iconOn,
    toggled
  } = props

  return (
    <Button
      role={ 'circle' }
      icon={
        <i className={ classes('material-icons', toggled ? CLASSNAMES.on : CLASSNAMES.off) } >
          { toggled ? iconOn : iconOff }
        </i>
      }
    />
  )
}
export default Toggle

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  off: {
    color: 'rgb(220,220,220)',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  on: {
    color: '#fece5a',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: '.25s all ease-out'
  },
  iconWrapper: {
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    position: 'relative'
  },
})