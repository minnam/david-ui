/**
 * modules/calendar/day.jsx
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
import { stylesheet, classes } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme-handler.js'

/* Day ========================================================================================== */
const Day = (props: {
  /** The number to display representing the day of the month. */
  dayOfMonth: number,
  /** True if this Day is in the currently selected month. */
  inThisMonth: boolean,
  /** True if this Day is the currently selected date. */
  isSelected: boolean,
  /** Function called when this Day is clicked. */
  onClick: () => void,
}) => {
  const {
    dayOfMonth,
    inThisMonth,
    isSelected,
    onClick
  } = props

  return (
    <div
      className={classes(
        'no-select',
        CLASSNAMES.day,
        isSelected && CLASSNAMES.selected,
        !inThisMonth && CLASSNAMES.notInMonth,
      )}
      onClick={onClick}
    >
      {dayOfMonth}
    </div>
  )
}
export default Day
/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  day: {
    cursor: 'pointer',
    display: 'table-cell',
    height: '50px',
    padding: '10px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '50px',
    $nest: {
      '&:hover': {
        border: `3px solid ${THEME.colors.primary}`
      }
    }
  },
  selected: {
    border: `3px solid ${THEME.colors.primary}`,
    fontWeight: 700,
  },
  notInMonth: {
    color: THEME.colors.text.tertiary,
  }
})