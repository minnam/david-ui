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
import { Button } from '../'

/* <ToolbarButton /> ============================================================================ */
const ToolbarButton = (props: {
  disabled: boolean,
  label: string,
  onClick: () => void,
  primary: boolean,
  role: string,
  secondaryButtonIcon: *,
  secondaryOnClick: () => void,
  style?: CSSRule,
  to: string,
}) => {
  const {
    disabled,
    label,
    onClick,
    role,
    secondaryButtonIcon,
    secondaryOnClick,
    style,
    to
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
    />
  )
}
export default ToolbarButton