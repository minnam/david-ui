/**
 * modules/table/col.jsx
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

/* <Col /> ====================================================================================== */
const Col = (props: {
  /** children Content */
  children: any,
  /** className for base */
  className: string,
  /** Disable column */
  disable: boolean,
  highlight: boolean,
  /** onClick callback for column */
  onClick: () => void,
  /** If true, bold the text */
  primary: boolean,
  /** Style for base */
  styles: CSSRule,
  /** URL for react router */
  target: string,
  /** URL for regular anchor tag */
  to: string
}) => {
  const {
    children,
    className,
    disable,
    highlight,
    onClick,
    primary,
    styles,
    target,
    to,
  } = props

  return <td
    className={classes(
      CLASSNAMES.base,
      primary && CLASSNAMES.primary,
      className
    )}
  >
    <span
      className={classes(
        CLASSNAMES.wrapper,
        disable && CLASSNAMES.disable,
        disable && 'no-select'
      )}
      style={{
        color: highlight ? '#fc4e4e' : '',
        cursor: 'pointer'
      }}
    >
      {
        (() => {
          if (disable) {
            return children
          }
          if (to) {
            return <Link
              onClick={onClick}
              target={target}
              to={to}
            >
              {children}
            </Link>
          }
          if (onClick) {
            return <a
              className={CLASSNAMES.wrapper}
              onClick={onClick}
            >
              {children}
            </a>
          }
          return <span className={CLASSNAMES.wrapper}>
            {children}
          </span>
        })()
      }
    </span>
  </td>
}
export default Col

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  primary: {
    fontWeight: 600
  },
  wrapper: {
    position: 'relative'
  },
  base: {
    $nest: {
      '&:hover .text-help': {
        display: 'none'
      }
    }
  },
  textHelp: {
    display: 'none',
    position: 'absolute',
    left: 0,
    width: 200,
    background: '#2f4050',
    color: 'rgb(228, 228, 228)',
    fontSize: 12,
    top: 15,
    padding: 10
  },
  help: {
    fontSize: 10,
    color: '#337ab7'
  },
  disable: {
    color: 'rgb(140,140,140)',
    cursor: 'not-allowed',
  }
})
