/**
 * modules/checkbox/checkbox.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruciton.com
 * @flow
 */
import * as React from 'react'
import type { FieldProps } from 'redux-form'
import { classes, stylesheet } from 'typestyle'

/* Components =================================================================================== */
import FieldWrapper from '../field-wrapper/field-wrapper'

/* <Checkbox /> ================================================================================= */
export default class Checkbox extends React.Component<*, *> {
  props: {
    fullwidth: boolean,
    group: boolean,
    input: *,
    label: string,
    normalize: Function,
    placeholder: string,
    type: string,
    style: CSSRule,
  } & FieldProps

  state: {
    active: boolean,
    checked: boolean,
    hover: boolean
  }

  state = {
    active: false,
    checked: false,
    hover: false
  }

  componentWillMount () {
    if (this.props && this.props.meta) {
      this.setState({
        checked: this.props.meta.initial
      })
    }
  }

  render () {
    const {
      fullwidth,
      input,
      label,
      meta,
      normalize,
      placeholder,
      style
    } = this.props
    const {
      hover,
      active,
      checked
    } = this.state

    const boxStatusClass = classes(hover && 'hover', checked && 'checked', active && 'active')

    return (
      <FieldWrapper
        parentClassName={classes(fullwidth ? CLASSNAMES.parentFullWidth : CLASSNAMES.parent, 'no-select')}
        style={{
          ...style,
          marginBottom: 0
        }}
        {...meta}
      >
        <div
          className={classes(CLASSNAMES.checkboxBase, 'no-select')}
          onMouseDown={() => {
            this.setState({active: true}, () => {
              input.onChange(this.state.active)
            })
          }}
          onMouseEnter={() => { this.setState({ hover: true }) }}
          onMouseLeave={() => { this.setState({ hover: false }) }}
          onMouseUp={() => { this.setState({ checked: !checked, active: false }) }}
        >
          <div className={classes(CLASSNAMES.checkboxWrapper)}>
            <span className={classes('checkbox', boxStatusClass)}>
              { checked && <i className="material-icons">check</i> }
            </span>
            <input
              id={`jams-${input.name}`}
              className={CLASSNAMES.input}
              normalize={normalize}
              placeholder={placeholder}
              type='checkbox'
              {...input}
            />
          </div>
          <label>{label}</label>
        </div>
      </FieldWrapper>
    )
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  checkboxBase: {
    display: 'inline-block',
    $nest: {
      '&>label': {
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: 700,
        maxWidth: '100%',
        paddingLeft: 10,
      },
    }
  },
  checkboxWrapper: {
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    height: 22,
    margin: 0,
    padding: 0,
    position: 'relative',
    verticalAlign: 'middle',
    width: 22,
    $nest: {
      '& .checkbox': {
        alignItems: 'center',
        display: 'flex',
        height: 22,
        justifyContent: 'center',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: '.05s all',
        marginTop: 0,
        marginBottom: 0,
        width: 22,
        $nest: {
          '& i': {
            fontSize: 18
          }
        }
      },
      '& .active': {
        width: 19,
        height: 19,
        $nest: {
          '& i': {
            fontSize: 15
          }
        }
      },
      '&>.checked': {
        background: '#1ab394',
        border: '2px solid #1ab394',
      },
      '&>.hover': {
        // Styling for checkbox in hover state.
      },
      '& i': {
        color: '#ffffff',
        fontSize: 18,
      },
      '&>span': {
        border: '2px solid #cacaca',
        display: 'inline-block',
        height: 22,
        width: 22,
      },
    },
  },
  input: {
    marginBottom: 5,
    opacity: 0,
    position: 'absolute',
  },
  parent: {
    cursor: 'pointer',
    display: 'inline-block',
    margin: '0px 15px 0px 0px',
    width: 'initial'
  },
  parentFullWidth: {
    cursor: 'pointer',
    margin: 0,
  },
})