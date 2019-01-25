/**
 * modules/avatar/avatar.jsx
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
import { stylesheet } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme-handler.js'

/* Constants ==================================================================================== */
const CURRENT_TIME = new Date().getHours()
const IMAGES = {
  logo: THEME.avatar.logo,
  error: THEME.avatar.error,
  default: THEME.avatar.default
}

/* <Avatar /> =================================================================================== */
const Avatar = (props: {
  /** If true, width style property set to 100% */
  fullWidth?: boolean,
  /** If true, prepend a greeting to the message string */
  greeting: boolean,
  /** The displayed message */
  message: string,
  /** Specifies the image to use */
  type?: 'logo' | 'default' | 'error',
}) => {
  const {
    fullWidth,
    greeting,
    message,
    type = 'default'
  } = props
  return (
    <div
      className={CLASSNAMES.avatar}
      style={{width: fullWidth && '100%'}}
    >
      <div className={CLASSNAMES.image}>
        <img src={IMAGES[type] ? IMAGES[type] : IMAGES.default} />
      </div>
      <div className={CLASSNAMES.message}>
        <div className={CLASSNAMES.messageTail} />
        {
          (() => {
            if (greeting) {
              if (CURRENT_TIME >= 4 && CURRENT_TIME < 12) {
                return 'Good morning! '
              }
              if (CURRENT_TIME >= 12 && CURRENT_TIME < 18 ) {
                return 'Good afternoon! '
              }
              return 'Good evening! '
            }
          })()
        }
        {message}
      </div>
    </div>
  )
}
export default Avatar

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  avatar: {
    alignItems: 'center',
    display: 'flex',
    padding: '15px 0px',
    width: 500,
  },
  image: {
    alignItems: 'center',
    display: 'flex',
    float: 'left',
    justifyContent: 'center',
    width: 74,
    $nest: {
      '& img': {
        width: 74,
      },
    },
  },
  message: {
    background: THEME.colors.background.primary,
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.1)',
    display: 'inline-block',
    fontSize: 14,
    height: '100%',
    letterSpacing: 0.5,
    marginLeft: 15,
    padding: 15,
    position: 'relative',
    width: 'calc(100% - 89px)',
  },
  messageTail: {
    background: THEME.colors.background.primary,
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    height: 15,
    left: -7.5,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    width: 15,
  },
})