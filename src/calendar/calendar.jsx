/**
 * modules/calendar/calendar.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu. dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React, { Component } from 'react'
import { stylesheet, classes } from 'typestyle'

/* Common ======================================================================================= */
import { formatDate } from '../utils/format'
import THEME from '../theme-handler.js'

/* Components =================================================================================== */
import Day from './day'

/* Constants ==================================================================================== */
const MAX_WEEKS = 6
const WEEK_LENGTH = 7

/* <Calendar /> ================================================================================= */
export default class Calendar extends Component<* , *> {
  // Prop types
  props: {
    /** The currently selected day of the month. */
    date: number,
    /** The currently selected month. */
    month: number,
    /** The currently selected year. */
    year: number,
    /** Sets the current date to a given day. */
    setDayInMonth: (day: number) => void,
    /** Sets the current month to a given month. */
    setMonth: (month: number) => void
  }

  /**
   * Renders the calendar with heading and navbar.
   */
  render () {
    return (
      <div className={'no-select'}>
        {this.displayNav()}
        {this.displayDayLabels()}
        {this.populateCalendar()}
      </div>
    )
  }

  /**
   * Creates a heading for the calendar which displays labels for each day of the week.
   */
  displayDayLabels () {
    const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return (
      <div className={CLASSNAMES.dayLabelBase}>
        {
          labels.map((day) =>
            <div
              className={ CLASSNAMES.dayLabel}
              key={day}
            >
              {day}
            </div>
          )
        }
      </div>
    )
  }

  /**
   * Returns a navigation bar for the calendar with buttons to cycle through
   * the months and a label to display the current month and year.
   */
  displayNav () {
    const {
      month,
      year,
      setMonth,
    } = this.props
    return (
      <div className={CLASSNAMES.navbarBase}>
        {this.displayNavButton('navigate_before', () => setMonth(month - 1))}
        <span className={CLASSNAMES.navbarHeading}>
          {formatDate(new Date(year, month), {year: true, month: true, day: false, time: false})}
        </span>
        {this.displayNavButton('navigate_next', () => setMonth(month + 1))}
      </div>
    )
  }

  /**
   * Returns an icon to be used as a button in the calendar navbar. The button calls
   * the given function when clicked.
   *
   * @arg {icon} string - the name of the material-icon to display.
   * @arg {onClick} Function - the function called when the button is clicked.
   */
  displayNavButton (icon: string, onClick: () => void) {
    return (
      <i
        className={classes(
          'material-icons',
          CLASSNAMES.navbarButton
        )}
        onClick={onClick}
      >
        {icon}
      </i>
    )
  }

  /**
   * Creates and returns a 2D array of Day components to be displayed in the body
   * of the calendar. Calculates the date each Day represents relative to the currently
   * selected Date.
   */
  populateCalendar () {
    const {
      date,
      month,
      year,
      setDayInMonth,
    } = this.props

    const offset = this.firstDayOffset(year, month)
    const currentMonth = []

    for (let w = 0; w < MAX_WEEKS; ++w) {
      const week = []

      for (let d = 0; d < WEEK_LENGTH; ++d) {
        const rDay = (w * WEEK_LENGTH) - offset + d       // day relative to start of current month
        const rDate = new Date(year, month, rDay)         // date based on relative day
        const inThisMonth = (rDate.getMonth() === month)  // is relative date in the current month?
        week.push(
          <Day
            dayOfMonth={rDate.getDate()}
            inThisMonth={inThisMonth}
            isSelected={(date === rDay)}
            key={`w${w}d${d}`}
            onClick={() => {setDayInMonth(rDay)}}
          />
        )
      }
      currentMonth.push(<div key={w}>{week}</div>)
    }
    return <div>{currentMonth}</div>
  }

  /**
   * Finds how many days offset from Sunday the first day of the given month is. Returns a number
   * representing the offset where the days are numbered 0 - 6 (Sun - Sat).
   * If the first day of the month falls on a Sunday, function returns 6.
   *
   * @arg {number} year specifies which year the month is in.
   * @arg {number} month specfifies the month.
   * @return {number} The offset in number of days from the start of the week.
   */
  firstDayOffset (year: number, month: number): number {
    const day = new Date(year, month).getDay()
    const offset = day === 0 ? 7 : day
    return offset - 1
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  navbarBase: {
    alignItems: 'center',
    background: THEME.colors.background.secondary,
    display: 'flex',
    height: '50px',
    justifyContent: 'space-between',
    padding: '10px',
  },
  navbarButton: {
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        color: THEME.colors.primary,
      }
    }
  },
  navbarHeading: {
    fontSize: 15,
    fontWeight: 700,
  },
  dayLabel: {
    display: 'table-cell',
    height: '50px',
    padding: '10px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '50px',
  },
  dayLabelBase: {
    borderBottom: `1px solid ${THEME.colors.borders.primary}`,
  },
})