/**
 * modules/Form
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 */
import React, { Component } from 'react'
import { classes, stylesheet } from 'typestyle'
import 'react-widgets/dist/css/react-widgets.css'

/* Components =================================================================================== */
import GLOBAL_CLASSNAMES from '../classnames'

/* Components =================================================================================== */
import ANIMATIONS from '../utils/animations'
import IconButton from '../icon-button/icon-button'
import Toolbar from '../toolbar/toolbar'
import ToolbarButton from '../toolbar/toolbar-button'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = { finshedAnimation: false }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onSubmit)
    this.animationTimeout = setTimeout(() => {
      this.setState({ finshedAnimation: true })
    }, 550)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onSubmit)
    clearTimeout(this.animationTimeout)
  }

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.onSubmit()
    }
  }

  render () {
    const {
      children,
      onCancel,
      onSubmit,
      onKeyPress,
      submitting,
      submitLabel,
      title,
      tools = [],
      fullWidth
    } = this.props
    const { finshedAnimation } = this.state

    return (
      <div>
        <Toolbar fullWidth={fullWidth}>
          {
            (() => {
              if (title) {
                return <div className={GLOBAL_CLASSNAMES.flex}>
                  <IconButton
                    icon={'chevron_left'}
                    className={classes(GLOBAL_CLASSNAMES.pullLeft, GLOBAL_CLASSNAMES.marginRight)}
                    onClick={onCancel}
                    style={{
                      marginRight: 15
                    }}
                  />
                  <h3 className={ classes(GLOBAL_CLASSNAMES.pullLeft, GLOBAL_CLASSNAMES.title) }>
                    {title}
                  </h3>
                </div>
              }
            })()
          }
          <div className={GLOBAL_CLASSNAMES.iboxTools}>
            {
              tools.map((tool, key) => {
                return React.cloneElement(
                  tool,
                  { key }
                )
              })
            }
            <ToolbarButton
              label={submitLabel || 'Save'}
              disabled={submitting}
              onClick={onSubmit}              
              style={{ marginLeft: '10px' }}
              primary
            />
          </div>
        </Toolbar>
        <div
          className={classes(
            GLOBAL_CLASSNAMES.wrapperContent,
            CLASSNAMES.wrapper,
            !finshedAnimation && ANIMATIONS.fadeInRight
          )}
        >
          <form onSubmit={onSubmit} onKeyPress={onKeyPress}>
            <div className={GLOBAL_CLASSNAMES.ibox}>{children}</div>
          </form>
        </div>
      </div>
    )
  }
}

/* Style ======================================================================================== */
const CLASSNAMES = stylesheet({
  toolWrapper: {
    alignSelf: 'center',
    margin: 0,
  },
  wrapper: {
    padding: 0,
  },
})