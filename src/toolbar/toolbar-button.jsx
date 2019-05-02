/**
 * modules/toolbar/toolbar-button.jsx
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

/* Components =================================================================================== */
import Button from '../button/button'

/* <ToolbarButton /> ============================================================================ */
const ToolbarButton = (props: {
  disabled: boolean,
  label: string,
  onClick: () => void,
  primary: boolean,
  secondaryButtonIcon: *,
  secondaryOnClick: () => void,
  style?: CSSRule,
  to: string,
  /** Button Types */
  primary?: boolean,
  secondary?: boolean,
  alternative?: boolean,
  circle?: boolean,
}) => {
  const {
    disabled,
    label,
    onClick,
    role,
    secondaryButtonIcon,
    secondaryOnClick,
    style,
    to,
    /** Button Types */
    primary,
    secondary,
    alternative,
    circle
  } = props

  return (
    <Button
      disabled={ disabled }
      label={ label }
      onClick={ onClick }
      secondaryButtonIcon={secondaryButtonIcon}
      secondaryOnClick={secondaryOnClick}
      style={ style || { marginLeft: '10px' } }
      to={ to }
      role={ role }
      disabled={ disabled }
      primary={primary}
      secondary={secondary}
      alternative={alternative}
      circle={circle}
    />
  )
}
export default ToolbarButton