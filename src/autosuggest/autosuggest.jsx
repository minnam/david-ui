/**
 * modules/debounce-input/debounce-input.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 * @flow
 */
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import type { FieldProps } from 'redux-form'
import { classes, stylesheet } from 'typestyle'

/* Components =================================================================================== */
import FieldWrapper from '../field-wrapper/field-wrapper'

/* <TextField /> ================================================================================ */
export default class AutoSuggest extends React.Component<*, *> {
  props: {
    className: string,
    errorClassName: string,
    inputClassName: string,
    inputStyle: CSSRule,
    inputWrapperClassName: string,
    label: string,
    labelClassName: string,
    labelStyle: CSSRule,
    parentClassName: *,
    placeholder: *,
    style: CSSRule,
    type: string,
    url: string,
    searchKey: string,
    suggestions: Array,
    generateLabel: Object => string
  } & FieldProps

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ''
  }

  onChange = e => {
    const { suggestions = [] } = this.props
    const userInput = e.currentTarget.value

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowercase().indexOf(userInput.toLowercase()) > -1
    )

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    })
  }

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
  }

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      })
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 })
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  render() {
    const {
      errorClassName,
      input,
      generateLabel,
      inputClassName = '',
      inputStyle,
      inputWrapperClassName,
      label,
      labelClassName,
      labelStyle,
      meta,
      parentClassName,
      placeholder,
      style,
      type
    } = this.props
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this

    return (
      <FieldWrapper
        errorClassName={errorClassName}
        id={input.name}
        inputWrapperClassName={inputWrapperClassName}
        label={label}
        labelClassName={labelClassName}
        labelStyle={labelStyle}
        parentClassName={parentClassName}
        style={{ ...style }}
        {...meta}
      >
        <input
          className={classes(CLASSNAMES.input, inputClassName)}
          id={`jams-${input.name}`}
          style={{ ...inputStyle }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={input => {
            this.userInput = userInput
          }}
          type={type}
          value={userInput}
        />
        {() => {
          if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
              return (
                <div className={CLASSNAMES.dropdown}>
                  <div
                    className={
                      (CLASSNAMES.dropdownItem,
                      index === activeSuggestion && CLASSNAMES.dropdownCursor)
                    }
                    key={suggestion}
                    onClick={onClick}
                  >
                    {suggestion}
                  </div>
                </div>
              )
            }
          }
        }}
      </FieldWrapper>
    )
  }
}

/* style ======================================================================================== */
const CLASSNAMES = stylesheet({
  dropdown: {
    background: 'rgba(255, 255, 255, 1)',
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    $nest: {
      '&:empty': {
        boxShadow: 'none'
      }
    }
  },
  dropdownCursor: {
    background: 'rgba(220,220,220, 1)'
  },
  dropdownItem: {
    cursor: 'pointer',
    padding: '12px 15px',
    $nest: {
      '&:hover': {
        background: 'rgba(220, 220, 220, 1)'
      }
    }
  },
  input: {
    height: 36,
    padding: '6px 0px 6px 0px',
    transition: 'border-color 0.15s',
    transitionTimingFunction: 'ease-in-out',
    width: '100%',
    $nest: {
      '&:focus': {
        borderColor: 'rgba(26, 179, 148, 1)',
        outline: 'none'
      }
    }
  }
})
