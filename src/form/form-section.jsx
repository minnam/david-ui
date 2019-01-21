/**
 * modules/form-section/form-section.jsx
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

/* Common ======================================================================================= */
import GLOBAL_CLASSNAMES from '../classnames'

/* Components =================================================================================== */
import ANIMATIONS from '../utils/animations'
import LineBreak from '../line-break/line-break'
import { CLASSNAMES as TABLE_CLASSNAMES } from '../table/table'

export default class FormSection extends Component {
  state = {
    toggleHeader: false
  }

  render () {
    const {
      children,
      className,
      contentStyle,
      fixedHeader,
      float,
      noPadding,
      style,
      title,
      tools = []
    } = this.props

    if (title || tools) {
      return (
        <div
          className={CLASSNAMES.formSectionWrapper}
          style={{...style}}
          ref={(form) => {this.form = form}}
        >
          {
            (() => {
              if (fixedHeader) {
                return this.displayFixedHeader()
              }
            })()
          }
          <div className={CLASSNAMES.titleWrapper}>
            <span className={CLASSNAMES.title}>
              <span>{title}</span>
            </span>
            <span className={CLASSNAMES.titleActionWrapper}>
              {
                tools.map((tool, key) => {
                  return (
                    <span
                      key={key}
                      style={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <div className={CLASSNAMES.btnDivider}></div>
                      {tool}
                    </span>
                  )
                })
              }
            </span>
          </div>
          <div
            className={classes(
              GLOBAL_CLASSNAMES.iboxContent,
              CLASSNAMES.content,
              float && CLASSNAMES.float,
              noPadding && CLASSNAMES.padder,
              className
            )}
            style = {{...contentStyle}}
          >
            {
              children || children.map((element, key) => {
                if (element) {
                  return (
                    <div key={key}>
                      {React.cloneElement(element)}
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      )
    }
    return (
      <div className={CLASSNAMES.wrapper}>
        <div
          className={classes(
            GLOBAL_CLASSNAMES.iboxContent,
            CLASSNAMES.content
          )}
          style={{...contentStyle}}
        >
          {
            children.length ? children.map((element, key) => {
              if (element) {
                return (
                  <span key={key}>
                    {React.cloneElement(element)}
                    <LineBreak/>
                  </span>
                )
              }
            }) : (children || '')
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.addEventListener('scroll', this.toggleHeader)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.toggleHeader)
    if (this.debounceToggle) {
      clearTimeout(this.debounceToggle)
    }
  }

  toggleHeader = () => {
    const { fixedHeaderOffset = 0 } = this.props

    if (this.debounceToggle) {
      clearTimeout(this.debounceToggle)
    }
    this.debounceToggle = setTimeout(() => {
      const formRect = this.form.getBoundingClientRect()
      const shouldToggle
        = this.form
          && formRect.top + fixedHeaderOffset <= 0
          && formRect.top + formRect.height + fixedHeaderOffset > 0
      this.setState({ toggleHeader: shouldToggle })
      this.debounceToggle = null
    }, 100)
  }

  displayFixedHeader () {
    const { title, tools = [] } = this.props
    const { toggleHeader } = this.state

    if (toggleHeader) {
      return (
        <div
          className={classes(
            ANIMATIONS.fadeInDown,
            CLASSNAMES.fixedHeader,
            TABLE_CLASSNAMES.fixedHeader
          )}
        >
          <h5 className={CLASSNAMES.fixedTitle}>{title}</h5>
          <span className={CLASSNAMES.fixedActionWrapper}>
            {
              tools.map((tool, key) => {
                return (
                  <span
                    key={key}
                    style={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <div className={CLASSNAMES.btnDivider}></div>
                    {tool}
                  </span>
                )
              })
            }
          </span>
        </div>
      )
    }
  }
}

/* Style ======================================================================================== */
const CLASSNAMES = stylesheet({
  btnDivider: {
    width: '5px',
    height: 'auto',
    display: 'inline-block',
  },
  content: {
    backgroundColor: 'white',
    // overflow: 'hidden',
    padding: 15,
  },
  fixedActionWrapper: {
    float: 'right',
    display: 'flex'
  },
  fixedHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    background: '#efefef',
    borderBottom: '1px solid #d1d1d1',
    height: 40,
    padding: '0 15px',
    position: 'fixed',
    top: 60,
    left: 70,
    width: 'calc(100% - 70px)',
    zIndex: 1,
    $nest: {
      '@media print': {
        display: 'none !important'
      }
    }
  },
  fixedTitle: {
    color: 'rgba(41, 54, 66, 1)',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
    margin: 0,
  },
  float: {
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.07)',
  },
  formSectionWrapper: {
    margin: '0px 0px 50px 0px',
  },
  padder: {
    padding: '15px 0px 0px 0px !important',
  },
  title: {
    alignItems: 'center',
    color: 'rgba(41, 54, 66, 1)',
    display: 'flex',
    fontSize: 13,
    fontWeight: 700,
    justifyContent: 'center',
    lineHeight: '18px',
    margin: 0,
  },
  titleActionWrapper: {
    float: 'right',
    display: 'flex'
  },
  titleWrapper: {
    alignItems: 'top',
    display: 'flex',
    height: 33,
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  wrapper: {
    marginBottom: 17.5,
  },
})