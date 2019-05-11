/**
 * modules/field-wrapper/field-wrapper.jsx
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
import ANIMATIONS from '../utils/animations'

/* <FieldWrapper /> ============================================================================= */
const FieldWrapper = (props: {
  /** Child elements */
  children: *,
  /** An error message to be displayed */
  error: string,
  /** Additional classname for the error message section */
  errorClassName: string,
  /** Determines if styling vertically or horizontally spaced styling should be applied */
  horizontal: boolean,
  isRequired: boolean,
  /** Additional classname for the wrapper div for child elements */
  inputWrapperClassName: string,
  /** Text to label the field(s) within the field wrapper. */
  label: string,
  /** Additional classname for the label */
  labelClassName: string,
  /** Additional styles for the label */
  labelStyle: CSSRule,
  /** Additional classname for the wrapper div */
  parentClassName: string,
  /** Additional styles */
  style: CSSRule,
  /** Determines if the field been interacted with. */
  touched: boolean,
  labelAlign: string
}) => {
  const {
    children,
    error,
    errorClassName,
    horizontal,
    isRequired,
    inputWrapperClassName,
    label,
    labelAlign,
    labelClassName,
    labelStyle,
    parentClassName,
    style,
    touched,
    helpbox,
  } = props
  const classNamePrefix = horizontal ? 'horizontal' : 'vertical'

  return (
    <div
      className={classes(CLASSNAMES[`${classNamePrefix}Parent`], parentClassName)}
      style={{...style}}
    >
      {
        (() => {
          if (label) {
            return <div
              style={{
                width: '100%',
                display: 'inline-block'
              }}
            >
              <span
                className={CLASSNAMES.labelParent}
                style={{
                  cursor: helpbox ? 'help' : ''
                }}
              >
                <label
                  className={classes(CLASSNAMES[`${classNamePrefix}Label`], labelClassName, 'no-select')}
                  style={{
                    ...labelStyle,
                    alignSelf: labelAlign ? 'end' : 'center',
                    cursor: helpbox ? 'help' : ''
                  }}
                >
                  {`${label}${isRequired ? ' (*)' : ''}`}
                </label>
                {
                  (() => {
                    if (helpbox) {
                      return <React.Fragment>
                        <i
                          className='material-icons'
                          style={{
                            fontSize: 13,
                            color: '#659bb9'
                          }}
                        >
                        help_outline
                        </i>
                        <div
                          className={classes(ANIMATIONS.fadeInRight, 'helpbox')}
                        >
                          {helpbox}
                        </div>
                      </React.Fragment>
                    }
                  })()
                }
              </span>
            </div>
          }
        })()
      }
      <div
        className={
          classes(
            CLASSNAMES[`${classNamePrefix}InputWrapper`],
            `${touched && error ? 'has-danger' : ''}`,
            inputWrapperClassName
          )
        }
      >
        {children}
      </div>
      <div
        className={classes(
          CLASSNAMES[`${classNamePrefix}TextHelp`],
          errorClassName,
          'david-ui-error',
          'no-select'
        )}
      >
        {
          (() => {
            if (error && touched) {
              return error
            }
          })()
        }
      </div>
    </div>
  )
}
export default FieldWrapper

/* Styles ======================================================================================= */
export const CLASSNAMES = stylesheet({
  verticalParent: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    marginBottom: 15
  },
  verticalTextHelp: {
    color: '#fd7979',
    display: 'block',
    fontSize: 10,
    width: '100%',
  },
  verticalLabel: {
    float: 'left',
    fontSize: 13,
    marginBottom: 0,
    paddingRight: 5,
    textAlign: 'left',
  },
  verticalInputWrapper: {
    float: 'left',
    width: '100%'
  },
  horizontalParent: {
    display: 'flex',
    paddingRight: 15,
    position: 'relative',
    $nest: {
      '& label': {
        marginBottom: 15
      }
    }
  },
  horizontalTextHelp: {
    color: '#fd7979',
    display: 'none',
    fontSize: 10,
    width: '100%',
  },
  horizontalLabel: {
    float: 'left',
    fontSize: 12,
    marginBottom: 0,
    paddingRight: 15,
    textAlign: 'left',
  },
  horizontalInputWrapper: {
    float: 'left',
    width: '100%'
  },
  labelParent: {
    position: 'relative',
    display: 'inline-block',
    $nest: {
      '& .helpbox': {
        background: 'white',
        boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.075)',
        display: 'none',
        marginLeft: 15,
        position: 'absolute',
        zIndex: 100,
        padding: 7.5,
        minWidth: 340,
        borderLeft: '3px solid #659bb9'
      },
      '&:hover .helpbox': {
        display: 'initial'
      }
    }
  }
})