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
import { FieldWrapper } from '..'

/* <TextField /> ================================================================================ */
export default class DebounceInput extends React.Component<*,*> {
  /* Prop Types ================================================================================= */
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
    generateLabel: Object => string
  } & FieldProps

  /* State Types ================================================================================ */
  state: {
    data: [],
    focused: boolean,
    hovered: boolean,
    index: number,
    selected: false,
    value: string
  }

  /* Class Types ================================================================================ */
  input: *
  debounceID: TimeoutID | null

  /* State ====================================================================================== */
  state = {
    data: [],
    focused: false,
    hovered: false,
    index: -1,
    value: ''
  }

  render () {
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
      data,
      focused,
      hovered,
      index,
      value
    } = this.state

    return (
      <FieldWrapper
        errorClassName={errorClassName}
        id={input.name}
        inputWrapperClassName={inputWrapperClassName}
        label={label}
        labelClassName={labelClassName}
        labelStyle={labelStyle}
        parentClassName={parentClassName}
        style={{...style}}
        {...meta}
      >
        <input
          className={classes(CLASSNAMES.input, inputClassName)}
          id={`jams-${input.name}`}
          style = {{...inputStyle}}
          autoComplete='off'
          autoCorrect='off'
          spellCheck='off'
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          ref={(input) => { this.input = input }}
          type={type}
          value={value}
        />
        {
          (() => {
            if (this.input && value && focused || hovered) {
              return (
                <div className={CLASSNAMES.dropdown}>
                  {
                    data.map((item, key) => {
                      return <div
                        className={classes(CLASSNAMES.dropdownItem, index === key && CLASSNAMES.dropdownCursor)}
                        onMouseOver={() => this.setState({ hovered: true })}
                        onMouseLeave={() => this.setState({ hovered: false })}
                        onClick={() => this.handleItemClick(key)}
                        key={key}
                      >
                        {generateLabel(item)}
                      </div>
                    })
                  }
                </div>
              )
            }
          })()
        }
      </FieldWrapper>
    )
  }

  componentDidMount () {
    const { input, generateLabel } = this.props
    if (input.value) {
      this.setState({
        data: [ input.value ],
        index: 0,
        value: generateLabel(input.value),
        selected: true
      })
    }
  }

  handleChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ value: event.target.value, focused: true }, () => {
        this.debounce()
      })
    }
    this.setState({ index: -1 })
  }

  handleBlur = () => {
    this.setState({ focused: false })
    if (this.state.index < -1) {
      this.setState({value: ''})
      this.props.input.onChange('')
    }
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { input, searchKey } = this.props
    const { data, index, focused, hovered } = this.state

    switch(event.keyCode) {
    case 13:
      if (focused || hovered) {
        event.stopPropagation()
      }
      if (index > -1) {
        input.onChange(data[index])
        this.setState({
          focused: false,
          hover: false,
          selected: true,
          value: data[index][searchKey]
        })
      }
      break
    case 27:
      this.setState({
        focused: false,
        hovered: false
      })
      break
    case 38:
      event.preventDefault()
      if (data.length) {
        this.setState({index: (index - 1) < 0 ? data.length - 1 : index - 1})
      }
      break
    case 40:
      event.preventDefault()
      if (data.length) {
        this.setState({index: (index + 1) % data.length})
      }
      break
    }
  }

  handleItemClick = (index: number) => {
    const { input, generateLabel } = this.props
    const { data } = this.state

    this.setState({ index })
    this.setState({
      focused: false,
      hovered: false,
      selected: true,
      value: generateLabel(data[index])// Displayed in input field
    })
    input.onChange(data[index])
  }

  debounce = () => {
    if (this.debounceID) {
      clearTimeout(this.debounceID)
    }

    this.debounceID = setTimeout(() => {
      this.search()
      this.debounceID = null
    }, 250)
  }

  search () {
    const { searchKey, url } = this.props
    const { value } = this.state

    /**
     * This use to be ${searchKey}=value but changed due to how we deal with multiple search keys
     */
    axios.get(`${url}?${qs.stringify({ search: [value] })}`).then(req => {
      this.setState({
        data: req.data[searchKey].slice(0,5)
      })
    })
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
        boxShadow: 'none',
      },
    },
  },
  dropdownCursor: {
    background: 'rgba(220,220,220, 1)',
  },
  dropdownItem: {
    cursor: 'pointer',
    padding: '12px 15px',
    $nest: {
      '&:hover': {
        background: 'rgba(220, 220, 220, 1)',
      },
    },
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
        outline: 'none',
      },
    },
  },
})