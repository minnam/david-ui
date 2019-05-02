/**
 * modules/button/button.jsx
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
import { classes, stylesheet } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme-handler'

/* Button ======================================================================================= */
const Button = (props: {
  /** Additional classnames passed from parent */
  className?: string,
  /** If true, button should be disabled */
  disabled?: boolean,
  /** element/icon/image/etc. to be displayed in button */
  icon?: *,
  /** Text to be displayed in a Button */
  label?: string,
  /** Button onclick event callback */
  onClick?: () => void,
  /** Button Types */
  primary?: boolean,
  secondary?: boolean,
  alternative?: boolean,
  circle?: boolean,
  /** Label for Secondary button on top right */
  secondaryButtonIcon?: *,
  secondaryOnClick?: () => void,
  /** Button size, 'sm' by default */
  size?: 'xs' | 'sm' | 'md' | 'lg',
  /** Additional styles for button element */
  style?: {},
  /** Specifies Link component's 'to' prop */
  to?: string,
  /** Specifies button type attribute */
  type?: string,
}) => {
  const {
    className,
    disabled,
    icon,
    label,
    onClick,    
    secondaryButtonIcon,
    secondaryOnClick,
    size,
    style,
    to,
    type,
    /** Button Types */
    primary,
    secondary,
    alternative,
    circle
  } = props

  const buttonSize = (() => {
    switch (size) {
    case 'xs':
      return CLASSNAMES.xs
    case 'sm':
      return CLASSNAMES.sm
    case 'md':
      return CLASSNAMES.md
    case 'lg':
      return CLASSNAMES.lg
    default:
      return CLASSNAMES.sm
    }
  })()

  let buttonType = CLASSNAMES.default

  if (primary) {
    buttonType = CLASSNAMES.primary
  }

  if (secondary) {
    buttonType = CLASSNAMES.secondary
  }

  if (alternative) {
    buttonType = CLASSNAMES.alternative
  }

  if (circle) {
    buttonType = CLASSNAMES.circle
  }

  return <span
    className='no-print'
    style={{
      position: 'relative',
      width: circle ? 37 : '' // Need to investigate why there is an offset for button (remove) in Card component
    }}
  >
    {
      (() => {
        if (to) {
          return (
            <Link to={ to }
              className={
                classes(
                  'no-select',
                  buttonSize,
                  buttonType,
                  className,
                  CLASSNAMES.button,
                )
              }
              style={ style }
              onClick={ disabled ? null : onClick }
            >
              { icon }
              { label }
            </Link>
          )
        }
        return (
          <button
            className={
              classes(
                'no-select',
                buttonSize,
                buttonType,
                className,
                CLASSNAMES.button,
              )
            }
            style={ style }
            onClick={ disabled ? null : onClick }
            type={ type || 'button' }
          >
            { icon }
            { label }
          </button>
        )
      })()
    }
    {
      (() => {
        if (secondaryButtonIcon) {
          return <span
            className={CLASSNAMES.secondaryButtonContainer}
            onClick={secondaryOnClick}
          >
            {secondaryButtonIcon}
          </span>
        }
      })()
    }
  </span>
}
export default Button

console.log('david', THEME())

/* Styles ======================================================================================= */
export const CLASSNAMES = stylesheet({
  button: {
    alignItems: 'center',
    border: 'none',
    borderRadius: 2.5,
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: 600,
    outline: 'none',
    textAlign: 'center',
    touchAction: 'manipulation',
    transition: 'background 0.8s',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    $nest: {
      'i': {
        fontSize: 18
      }
    }
  },
  primary: {
    background: THEME().colors.button.primary.background,
    color: THEME().colors.button.primary.color,
    $nest: {
      '&:hover': {
        background: THEME().colors.button.primary.hover.background,
        color: THEME().colors.button.primary.hover.color,
      },
      '&:active': {        
        backgroundSize: '100%',
        boxShadow: 'none',
        transition: 'background 0s'
      },
    }
  },
  secondary: {
    background: THEME().colors.button.secondary.background,
    boxShadow: 'none',
    color: THEME().colors.button.secondary.color,
    $nest: {
      '&:hover': {
        background: THEME().colors.button.secondary.hover.background,
        color: THEME().colors.button.secondary.hover.color,
      },
      '&:active': {        
        backgroundSize: '100%',
        boxShadow: 'none',
        transition: 'background 0s'
      },
    }
  },
  alternative: {
    background: THEME().colors.button.alternative.background,
    boxShadow: 'none',
    color: THEME().colors.button.alternative.color,
    $nest: {
      '&:hover': {
        background: THEME().colors.button.alternative.hover.background,
        color: THEME().colors.button.alternative.hover.color,
      },
      '&:active': {        
        backgroundSize: '100%',
        boxShadow: 'none',
        transition: 'background 0s'
      },
    }
  },
  default: {
    background: THEME().colors.button.default.background,
    boxShadow: 'none',
    color: THEME().colors.button.default.color,
    $nest: {
      '&:hover': {
        background: THEME().colors.button.default.hover.background,
        color: THEME().colors.button.default.hover.color,
      },
      '&:active': {        
        backgroundSize: '100%',
        boxShadow: 'none',
        transition: 'background 0s'
      },
    }
  },
  disabled: {
    background: 'rgb(220,220,220)',
    boxShadow: 'none',
    color: 'rgb(180,180,180)',
    cursor: 'default',
  },
  xs: {
    fontSize: 11,
    lineHeight: 1.5,
    padding: '3px 10px'
  },
  sm: {
    fontSize: 12,
    height: 30,
    lineHeight: '30px',
    padding: '0px 10px'
  },
  md: {
    fontSize: 14,
    lineHeight: 1.5,
    padding: '6px 12px'
  },
  lg: {
    // for large sized buttons
  },
  circle: {
    alignItems: 'center',
    background: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 10,
    height: 30,
    justifyContent: 'center',
    lineHeight: 1.428571429,
    marginBottom: 0,
    position: 'relative',
    width: 30,
    '&:hover': {
      background: 'rgb(250, 250, 250) radial-gradient(circle, transparent 1%, rgb(240, 240, 240) 1%) center/15000%',
    },
  },
  secondaryButtonContainer: {
    position: 'absolute',
    right: -5,
    top: -5,
    background: 'rgb(242, 87, 166)',
    cursor: 'pointer',
    color: 'white',
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    $nest: {
      'i': {
        fontSize: 10
      },
      '&:hover': {
        background: 'rgba(242, 87, 166, 0.9)',
        transition: 'background .1s',
      },
    }
  }
})