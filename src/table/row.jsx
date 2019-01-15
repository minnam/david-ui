/**
 * modules/table/row.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React, { Component, Fragment } from 'react'
import { classes, stylesheet } from 'typestyle'

/* Types ======================================================================================== */
import type { ChildrenArray, Element } from 'react'

/* Components =================================================================================== */
import Col from './col'
import { IconButton, Toggle } from '..'

/* <Row /> ====================================================================================== */
class Row extends Component<*, *> {
  /* Prop Types ================================================================================= */
  props: {
    actions: [],
    children: ChildrenArray<Element<typeof Col>>,
    className: string,
    disable: boolean,
    displayToggle: boolean,
    onToggle: () => void,
    style: CSSRule,
    toggled: boolean
  }
  /* Prop Types ================================================================================= */
  state: {
    actionToggled: boolean,
    toggled: boolean
  }
  /* Class Types ================================================================================ */
  row: ?HTMLElement

  /* Default Props ============================================================================== */
  static defaultProps: {
    actions: []
  }

  render () {
    const { children, className, displayToggle, style, disable } = this.props
    const { actionToggled } = this.state

    return (
      <tr
        className={classes(className, CLASSNAMES.base, actionToggled && 'no-select')}
        ref={row => { this.row = row }}
        style={{...style}}
        onMouseLeave={() => {
          if (actionToggled) {
            this.setState({ actionToggled: false })
          }
        }}
      >
        {
          (() => {
            if (disable) {
              return <Fragment>
                {
                  React.Children.map(children, (child, key) => {
                    return React.cloneElement(child, {...child.props, key, disable})
                  })
                }
              </Fragment>
            } else {
              return <Fragment>
                {displayToggle ? this.renderToggle() : null}
                {children}
                {this.renderActionColumn()}
              </Fragment>
            }
          })()
        }

      </tr>
    )
  }

  constructor (props: *) {
    super (props)
    this.state = {
      actionToggled: false,
      toggled: props.toggled
    }
  }

  renderToggle () {
    const { displayToggle, onToggle } = this.props
    const { toggled } = this.state

    if (displayToggle) {
      return (
        <td
          className={CLASSNAMES.rowData}
          onClick={() => {
            this.setState({ toggled: !toggled })
            onToggle()
          }}
        >
          <Toggle
            toggled={toggled}
            iconOn='star'
            iconOff='star_border'
          />
        </td>
      )
    } else {
      return null
    }
  }

  renderActionColumn () {
    const { actions } = this.props
    const { actionToggled } = this.state

    if (actions) {
      return (
        <td
          className={CLASSNAMES.rowData}
          onClick={() => {
            this.setState({ actionToggled: true })
          }}
        >
          <IconButton
            icon={ 'more_horiz' }
          />
          {
            actionToggled ? <span
              className='action-dialog animated fadeInUp'
            >
              {
                actions.map((element, key) => {
                  if (element) {
                    return React.cloneElement(element, {
                      key,
                      onClick: () => {
                        if (element.props.onClick) {
                          element.props.onClick()
                        }
                        this.setState({ actionToggled: false })
                      }
                    })
                  }
                })
              }
            </span> : null
          }
        </td>
      )
    }
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  rowBase: {
    $nest: {
      '&:hover' : {
        background: 'rgb(247,247,247)'
      }
    }
  },
  rowMoreButton: {
    alignItems: 'center',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 12,
    height: 30,
    justifyContent: 'center',
    lineHeight: 1.428571429,
    marginBottom: '0px !important',
    padding: '0 !important',
    textAlign: 'center',
    width: 30,
    outline: 'none'
  },
  rowData: {
    position: 'relative'
  }
})

/* Export ======================================================================================= */
export default Row