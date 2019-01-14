/**
 * modules/icon-button/icon-button.jsx
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
import { CLASSNAMES as BUTTON_STYLES } from '../button/button'

/* IconButton =================================================================================== */
const IconButton = (props: {
  /** Button onclick event callback */
  onClick: () => void,
  /** The Material Icon to use. */
  icon: string,
  /** Additional class names to be added to the button element. */
  className: string,
  /** The type attribute for the button element. Defaults to button if no value is given. */
  type: string,
  secondaryButtonIcon: *,
  secondaryOnClick: () => void
}) => {
  const {
    className,
    icon,
    onClick,
    secondaryButtonIcon,
    secondaryOnClick,
    type,
  } = props

  return (
    <button
      className={
        classes(
          'no-select',
          CLASSNAMES.icon,
          className,
        )
      }
      onClick={ onClick }
      type={ type || 'button' }
    >
      <i className={ 'material-icons' }>{ icon }</i>
      {
        (() => {
          if (secondaryButtonIcon) {
            return <span
              className={BUTTON_STYLES.secondaryButtonContainer}
              onClick={secondaryOnClick}
            >
              {secondaryButtonIcon}
            </span>
          }
        })()
      }
    </button>
  )
}
export default IconButton

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  icon: {
    alignItems: 'center',
    background: 'rgba(0,0,0,0)',
    border: 'none',
    borderRadius: '50%',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    outline:'none',
    padding: 0,
    touchAction: 'manipulation',
    transition: 'background 0.8s',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
})