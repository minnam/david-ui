/**
 * modules/dialog/dialog.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */

import * as React from 'react'
import { style, classes } from 'typestyle'

/* Components =================================================================================== */
import ANIMATIONS from '../utils/animations'
import Button from '../button/button'

/* <DialogTitle /> ============================================================================== */
export const DialogTitle = (props: {
  /** Overall message */
  message: string,
  /** A word to emphasize */
  target: string
}) => <span>
  {props.message}<span className='hl'>{` ${props.target || ''}`}</span>{props.target ? '?' : ''}
</span>

/* <ModalDialogPanel /> ========================================================================= */
export class ModalDialogPanel extends React.Component<*, *> {
  props: {
    close: () => void,
    confirm: () => void,
    content: *,
    fullWidth: boolean,
    height: number | string,
    title: *,
    disableActions: boolean,
    contentStyle: CSSRule,
    fadeIn: string
  }

  render () {
    const {
      close,
      confirm,
      content,
      fullWidth = true,
      height = 'initial',
      title = '',
      contentStyle,
      fadeIn
    } = this.props

    return <div
      className={
        classes(
          CLASSNAMES.ibox,
          fullWidth ? CLASSNAMES.fullWidth : null,
          (() => {
            switch (fadeIn) {
            case 'down':
              return ANIMATIONS.fadeInDown
            default:
              return ANIMATIONS.fadeInUp
            }
          })()
        )
      }
      style={contentStyle}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {
        (() => {
          if (title) {
            return <div className={CLASSNAMES.title}>{title}</div>
          }
        })()
      }
      {
        (() => {
          if (content) {
            return <div
              className={CLASSNAMES.contentWrapper}
              style={{ height }}
            >
              {content}
            </div>
          }
        })()
      }
      {
        (() => {
          if (!this.props.disableActions) {
            return <div className={CLASSNAMES.actionWrapper}>
              <Button
                label='OK'
                style={{
                  float: 'right'
                }}
                onClick = {confirm}
                role='primary'
              />
              <Button
                label='Cancel'
                style={{
                  float:'right',
                  marginRight: 7.5
                }}
                onClick={close}
              />
            </div>
          }
        })()
      }
    </div>
  }
}

/* <DialogPanel /> ========================================================================= */
export class DialogPanel extends React.Component<*, *> {
  props: {
    close: () => void,
    confirm: () => void,
    content: *,
    fullWidth: boolean,
    height: number | string,
    title: *,
    contentStyle: CSSRule,
    fadeIn: string
  }

  render () {
    const {
      content,
      fullWidth = true,
      height = 'initial',
      title,
      fadeIn,
      contentStyle
    } = this.props

    return <div
      className={
        classes(
          CLASSNAMES.ibox,
          fullWidth ? CLASSNAMES.fullWidth : null,
          (() => {
            switch (fadeIn) {
            case 'down':
              return ANIMATIONS.fadeInDown
            default:
              return ANIMATIONS.fadeInUp
            }
          })()
        )
      }
      style={contentStyle}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <div className={CLASSNAMES.title}>{title}</div>
      <div
        className={CLASSNAMES.contentWrapper}
        style={{ height }}
      >
        {content}
      </div>
    </div>
  }
}

/* <Dialog /> =================================================================================== */
export default class Dialog extends React.Component<*, *> {
  props: {
    contents: [],
    dialog: {
      close: () => {},
      content: React.Node,
      contentStyle: CSSRule,
      disableActions: boolean,
      fadeIn: string,
      fullWidth: boolean,
      height: number,
      index: number,
      onConfirm: () => {},
      parentClassName: string,
      style: CSSRule,
      submitOnEnter: boolean,
      title: string,
      type: string,
    },
    close: (a: *) => {},
    title: string
  }

  constructor (props) {
    super(props)

    this.onEnter = this.onEnter.bind(this)
    window.addEventListener('keydown', this.onEnter)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onEnter)
  }

  onEnter = (event) => {
    const { dialog, close } = this.props
    switch (event.keyCode) {
    /** On enter */
    case 13:
      event.stopPropagation()
      if (dialog.submitOnEnter) {
        if (dialog.onConfirm) {
          dialog.onConfirm()
        } else {
          close()
        }
      }
      break
    /** On esc */
    case 27:
      close()
    }

  }

  render () {
    const {
      dialog,
      contents,
      close,
      title
    } = this.props

    if (dialog) {
      return (
        <div
          className={
            classes(
              CLASSNAMES.dialogWrapper,
              dialog.parentClassName
            )
          }
          onClick = {() => {
            close(null)
          }}
          style={dialog.style}
        >
          {
            dialog ? React.cloneElement(
              contents[dialog.index], {
                content: dialog.content,
                fullWidth: dialog.fullWidth,
                height: dialog.height,
                contentStyle: dialog.contentStyle,
                title: dialog.title ? dialog.title : title,
                type: dialog.type,
                disableActions: dialog.disableActions,
                fadeIn: dialog.fadeIn,
                close: () => {close(null)},
                confirm: () => {
                  if (dialog.onConfirm) {
                    dialog.onConfirm()
                  }
                  close(null)
                }
              }
            ) : null
          }
        </div>
      )
    } else {
      return null
    }
  }
}

/* Styles ======================================================================================= */
export const CLASSNAMES = {
  dialogWrapper: style({
    alignItems: 'center',
    background: 'rgba(0,0,0,0.15)',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  }),
  fullWidth: style({
    width: 'calc(100% - 30px)'
  }),
  ibox: style({
    clear: 'both',
    marginBottom: 0,
    marginTop: 0,
    padding: 0
  }),
  title: style({
    background: 'white',
    fontSize: 14,
    fontWeight: 600,
    minHeight: '48px',
    padding: '15px 15px 7px',
    $nest: {
      '& .hl': {
        color: '#1c84c6'
      }
    }
  }),
  contentWrapper: style({
    background: 'white',
    overflowY: 'auto',
    padding: '0 15px'
  }),
  actionWrapper: style({
    backgroundColor: 'white',
    color: 'inherit',
    height: 60,
    padding: 15
  }),
  dialogPanel: {
    parent: style({
      width: 'calc(100% - 30px)'
    })
  }
}