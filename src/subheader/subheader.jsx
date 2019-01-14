/**
 * modules/subheader/subheader.jsx
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

/* Common ======================================================================================= */
import THEME from '../theme'

/* Components =================================================================================== */
import { ANIMATIONS } from '..'

/* <Subheader /> ================================================================================ */
const Subheader = (props: {
  /** Additional elements/text to display */
  items: [],
  /** Additional styles */
  style: CSSRule,
  /** The title displayed on the subheader */
  title: string,
}) => {
  const {
    items = [],
    style,
    title
  } = props

  return (
    <div
      className={classes('sub-header', ANIMATIONS.fadeInRight, CLASSNAMES.subheader)}
      style={style}
    >
      <span className={CLASSNAMES.title}>{title}</span>
      <span>
        {
          items.map((item, key) => {
            if (item) {
              return (
                <span
                  className={CLASSNAMES.item}
                  key={key}
                >
                  <span className={CLASSNAMES.title}>{item.title}:</span>
                  {item.value}
                </span>
              )
            }
          })
        }
      </span>
    </div>
  )
}
export default Subheader

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  subheader: {
    alignItems: 'center',
    borderBottom: `1px solid ${THEME.borders.input}`,
    display: 'flex',
    fontSize: 11,
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: '0px 15px 5px 15px',
    width: '100%',
    $nest: {
      '@media print': {
        marginTop: '0px !important'
      }
    }
  },
  title: {
    color: THEME.text.primary,
    fontWeight: 600,
    marginRight: 5,
  },
  item: {
    marginLeft: 20,
  }
})