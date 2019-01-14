/**
 * modules/toolbar/toolbar-highlight.jsx
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
import { classes, stylesheet } from 'typestyle'

/* <ToolbarHighlight /> \======================================================================== */
const ToolbarHighlight = (props: {
  fullWidth?: boolean,
  primary?: boolean,
  text: string,
  textAlign: 'center' | 'left' | 'right',
  style: CSSRule
}) => {
  return (
    <span
      className={CLASSNAMES.toolbarHighlightParent}
      style={{
        width: props.fullWidth ? '100%' : 'calc(100% - 300px)',
        ...props.style
      }}
    >
      <span className={ CLASSNAMES.toolbarHighlightTextWrapper }>
        <span
          className={classes(
            CLASSNAMES.toolbarHighlightText,
            props.primary && CLASSNAMES.toolbarHighlightPrimary
          )}
          style={{
            textAlign: props.textAlign
          }}
        >
          {props.text}
        </span>
      </span>
    </span>
  )
}

export default ToolbarHighlight

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  toolbarHighlightParent: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  toolbarHighlightTextWrapper: {
    padding: '0 15px',
    position: 'absolute',
    right: 0,
    width: '100%',
    zIndex: -1
  },
  toolbarHighlightText: {
    background: '#e8e8e8',
    color: '#293642',
    float: 'right',
    fontSize: 12,
    padding: '0 15px',
    textAlign: 'right',
    width: '25%',
    $nest: {
      '@media screen and (max-width: 1300px)': {
        width: '40%'
      }
    }
  },
  toolbarHighlightPrimary: {
    background: '#2f4050',
    color: 'white',
    fontSize: 'inherit'
  }
})