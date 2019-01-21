/**
 * modules/loading.jsx
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
import Avatar from '../avatar/avatar'

/* <Loading/> =================================================================================== */
const Loading = (props: {
  /** The page name used in the loading message. */
  name: string,
  /** Specifiy a custom message to return if there is an error. */
  error: string
}) => {
  const {
    name,
    error
  } = props

  return (
    <div>
      <div className={classes(ANIMATIONS.fadeInLeft, CLASSNAMES.loadingBase)}>
        <Avatar
          message={
            <span className={CLASSNAMES.loadingMessageWrapper}>
              <i className={classes('material-icons', ANIMATIONS.rotate)}>hourglass_empty</i>
              <span>{`Loading ${name}...`}</span>
            </span>
          }
        />
      </div>
      <div className={classes(ANIMATIONS.fadeInLeft, ANIMATIONS.delay[5])}>
        <Avatar
          type={'error'}
          message={'Hmm... Thats taking longer than it should.'}
        />
      </div>
      <div className={classes(ANIMATIONS.fadeInLeft, ANIMATIONS.delay[10])}>
        <Avatar
          message={
            <span>
              {
                (() => {
                  if (error) {
                    return error
                  } else {
                    return <span>
                  It seems like there is an error. Please ask <b>Ventana Technology Services</b> to assist you.
                    </span>
                  }
                })()
              }
            </span>
          }
        />
      </div>
    </div>
  )
}
/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  loadingBase: {
    marginTop: 72
  },
  loadingMessageWrapper: {
    display: 'flex',
    alignItems: 'center',
    $nest: {
      'i': {
        marginRight: 5
      }
    }
  }
})

/* Export ======================================================================================= */
export default Loading