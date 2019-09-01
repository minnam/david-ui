/**
 * modules/date-time-picker/date-time-picker.jsx
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
import {classes, stylesheet} from 'typestyle'
import type { FieldProps } from 'redux-form'

/* Common ======================================================================================= */
import GLOBAL_CLASSNAMES from '../classnames'
import THEME from '../theme-handler'

/* Components =================================================================================== */
import ANIMATIONS from '../utils/animations'
import Calendar from '../calendar/calendar'
import FieldWrapper from '../field-wrapper/field-wrapper'
import { formatDate } from '../utils/format'

/* <DateTimePicker /> =========================================================================== */
export default class DateTimePicker extends React.Component<* , *> {
  props: {
    isRequired: boolean,
    /** Input element */
    input: { onChange: Function, name: string, value: string } & HTMLElement,
    /** Input styling */
    inputStyle: CSSRule,
    /** Input label */
    label: string,
    defaultValue: Date,
    displayTime: boolean
  } & FieldProps

  states: {
    toggled: boolean
  }

  /* Class Types ================================================================================ */
  debounceID: TimeoutID | null

  state = {
    toggled: false
  }

  /**
   * Renders the input field and Calendar gui as children of a FieldWrapper component.
   */
  render () {
    const {
      isRequired,
      input,
      inputStyle,
      label,
      meta,
      displayTime = true,
    } = this.props
    const {
      hovered,
      toggled,
      selectedDate,
    } = this.state

  
    return (
      <FieldWrapper
        label = {label}
        id={input.name}
        isRequired={isRequired}
        {...meta}
      >
        <input
          {...input}
          id={`jams-${input.name}`}
          className={classes(GLOBAL_CLASSNAMES.input, CLASSNAMES.dateInput)}
          style = {{ ...inputStyle }}
          autoComplete='off'
          autoCorrect='off'
          spellCheck='off'
          onChange={e => {
            const value = e.target.value

            input.onChange(value)

            if (this.debounceID) {
              clearTimeout(this.debounceID)
              this.debounceID = null
            }

            const _selectedDate = isNaN(new Date(value)) ? new Date() : new Date(value)

            this.debounceID = setTimeout(() => {
              this.setState({ selectedDate: _selectedDate })
            }, 250)
          }}
          onFocus={() => {
            this.setState({toggled: true})
          }}
          onBlur={() => {
            const nextDate = isNaN(new Date(input.value)) ? selectedDate : new Date(input.value)
            input.onChange(formatDate(nextDate, { month: true, day: true, year: true, time: displayTime }))
            this.setState({selectedDate: nextDate, toggled: !!hovered})
          }}
        />
        <div
          className={classes(ANIMATIONS.fadeInUp, CLASSNAMES.dateUI,)}
          style = {{ display: toggled && 'flex' }}
          onMouseEnter={() => {
            this.setState({ hovered: true })
          }}
          onMouseLeave={() => {
            this.setState({ hovered: false })
          }}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <Calendar
            date={selectedDate.getDate()}
            month={selectedDate.getMonth()}
            year={selectedDate.getFullYear()}
            setMonth={month => {
              this.setMonth(month)
            }}
            setYear={year => {
              this.setYear(year)
            }}
            setDayInMonth={day => {
              this.setDayInMonth(day)
              this.setState({
                toggled: !this.state.toggled
              })
            }}
          />
        </div>
      </FieldWrapper>
    )
  }

  /**
   *
   * @constructor
   */
  constructor (props: *) {
    super(props)
    const { 
      defaultValue,
      displayTime = true,
      input
    } = props

    const state = {
      hovered: false,
      toggled: false,
      selectedDate: input.value ? new Date(input.value) : new Date()
    }

    if (defaultValue) {
      input.onChange(formatDate(defaultValue, { month: true, day: true, year: true, time: displayTime }))
      state.selectedDate = defaultValue
    }    

    this.state = state
  }

  /**
   * Sets the month to a given value.
   *
   * @param {number} month
   */
  setMonth (month: number) {
    const { input, displayTime = true } = this.props
    const { selectedDate } = this.state

    selectedDate.setMonth(month)
    this.setState({selectedDate})
    input.onChange(formatDate(selectedDate, { month: true, day: true, year: true, time: displayTime }))
  }

  /**
   * Sets the month to a given value.
   *
   * @param {number} month
   */
  setYear (year: number) {
    const { input, displayTime = true } = this.props
    const { selectedDate } = this.state

    selectedDate.setYear(year)
    this.setState({selectedDate})
    input.onChange(formatDate(selectedDate, { month: true, day: true, year: true, time: displayTime }))
  }

  /**
   * Sets the day of the month to a given value.
   *
   * @param {number} day
   */
  setDayInMonth (day: number) {
    const { input, displayTime = true } = this.props
    const { selectedDate } = this.state

    selectedDate.setDate(day)
    this.setState({selectedDate})
    input.onChange(formatDate(selectedDate, { month: true, day: true, year: true, time: displayTime }))
  }

  /**
   * Switches the toggle state for displaying the calendar.
   */
  onSubmit () { this.setState({toggled: !this.state.toggled}) }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  dateInput: {
    height: 36,
    width: '100%'
  },
  dateUI: {
    background: THEME().colors.background.primary,
    boxShadow: THEME().colors.background.shadow,
    display: 'none',
    left: 0,
    position: 'absolute',
    top: 60,
    zIndex: 2,
  },
})