/**
 * modules/table/row-action-button.jsx
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
import { Link } from 'react-router-dom'
import { stylesheet, classes } from 'typestyle'

/* <RowActionButton /> ========================================================================== */
const RowActionButton = (props: {
  /** Text displayed in button element. */
  label: string,
  /** callback function. */
  onClick: () => {},
  /** Url for Link route. */
  to: string,
  /** Determines if button should be disabled. */
  disabled: boolean
}) => {
  const {
    label,
    onClick,
    to,
    disabled
  } = props

  if (disabled) {
    return <button
      className={classes(CLASSNAMES.button, CLASSNAMES.disabled)}
    >
      {label}
    </button>
  }
  if (to) {
    return <Link to={to}>
      <button
        className={CLASSNAMES.button}
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  }
  return <button
    className={CLASSNAMES.button}
    onClick={onClick}
  >
    {label}
  </button>
}
export default RowActionButton

/* Syles ======================================================================================== */
const CLASSNAMES = stylesheet({
  button: {
    background: 'white',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    color: 'rgb(60,60,60)',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 600,
    height: 40,
    lineHeight: 1.5,
    marginBottom: '0 !important',
    padding: '5px 10px',
    textAlign: 'left',
    touchAction: 'manipulation',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '100%',
    outline: 'none',
    $nest: {
      '&:hover' : {
        background: 'rgb(247,247,247)',
        outline: 'none'
      }
    }
  },
  disabled: {
    color: 'rgb(220,220,220)',
    cursor: 'not-allowed'
  }
})