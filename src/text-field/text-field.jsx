/**
 * modules/text-field/text-field.jsx
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

/* Components =================================================================================== */
import FieldWrapper from '../field-wrapper/field-wrapper'

/* <TextField /> ================================================================================ */
const TextField = (props: {
  /** Additional classname for input element. */
  className: string,
  /** Classname used by FieldWrapper error message. */
  errorClassName: string,
  isRequired: boolean,
  /** input. */
  input: HTMLInputElement,
  /** Additional styling for the input element. */
  inputStyle: CSSRule,
  /** Text to be displayed as a help message. */
  help: string,
  /** Classname used by the FieldWrapper input wrapper. */
  inputWrapperClassName: string,
  /** The text displayed in the Field wrapper label. */
  label: string,
  /** Additional classname for the label. */
  labelClassName: string,
  /** Additional styles for the label. */
  labelStyle: CSSRule,
  /**  */
  meta: *,
  /**  */
  normalize: *,
  /** Classname used by the Field wrapper parent wrapper. */
  parentClassName: *,
  /** The input placeholder attribute. */
  placeholder: *,
  /** Additional styles. */
  style: CSSRule,
  /** Specifies the input type. */
  type: string,
  helpbox: string
}) => {
  const {
    className,
    errorClassName,
    help,
    isRequired,
    input,
    inputStyle,
    inputWrapperClassName,
    label,
    labelClassName,
    labelStyle,
    meta,
    normalize,
    parentClassName,
    placeholder,
    style,
    type,
    helpbox
  } = props

  return (
    <FieldWrapper
      errorClassName={errorClassName}
      inputWrapperClassName={inputWrapperClassName}
      label = {label}
      labelClassName={labelClassName}
      labelStyle={labelStyle}
      parentClassName={parentClassName}
      style={{...style}}
      id={input.name}
      isRequired={isRequired}
      helpbox={helpbox}
      {...meta}
    >
      <input
        id={`jams-${input.name}`}
        autoComplete="off"
        autoCorrect="off"
        className={classes(CLASSNAMES.input, className)}
        normalize={normalize}
        placeholder={placeholder}
        type={type}
        spellCheck="off"
        style = {{...inputStyle}}
        {...input}
      />
      {
        (() => {
          if (help) {
            return <span className={CLASSNAMES.help}>
              {help}
            </span>
          }
        })()
      }
    </FieldWrapper>
  )
}
export default TextField

/* Style ======================================================================================== */
const CLASSNAMES = stylesheet({
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
  help: {
    fontSize: 10
  }
})