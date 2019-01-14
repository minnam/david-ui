/**
 * modules/toolbar/toolbar-dropdown.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 * @flow
 */

import * as React from 'react'
import { classes, stylesheet } from 'typestyle'

/* <ToolbarDropdown /> ========================================================================== */
class ToolbarDropdown extends React.Component<*, *> {
  state = {
    toggled: false
  }

  render () {
    const {
      data,
      disabled,
      disabledMessage,
      onChange,
      value
    } = this.props
    const { toggled } = this.state

    return (
      <div className={ CLASSNAMES.dropdownWrapper }>
        <div
          className={
            classes(
              CLASSNAMES.value,
              disabled ? CLASSNAMES.valueDiabled : null
            )
          }
          onClick={() => {
            if (!disabled) {
              this.setState({ toggled: true })
            }
          }}
        >
          <span>
            {
              (() => {
                if (disabled) {
                  return disabledMessage || 'Disabled'
                }

                return data[value].name
              })()
            }
          </span>
          <i className="material-icons">arrow_drop_down</i>
        </div>
        {
          (() => {
            if (this.state.toggled) {
              return (
                <div
                  className={ CLASSNAMES.dropdownToggle }
                  onClick={() => {
                    this.setState({ toggled: false })
                  }}
                />
              )
            }
          })()
        }
        <div
          className={ CLASSNAMES.dropdownList }
          style={{
            display: toggled ? 'inline' : 'none',
          }}
        >
          {
            data.map((item, key) => {
              return <div
                className={ CLASSNAMES.dropdownItem }
                style={{
                  background: key === value && 'rgb(240,240,240)'
                }}
                onClick={() => {
                  this.setState({
                    toggled: false
                  })
                  onChange(key, item.value)
                }}
                key = {key}
              >
                { item.name }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default ToolbarDropdown

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  dropdownWrapper: {
    position: 'relative',
  },
  value: {
    alignItems: 'center',
    borderBottom: '2px solid rgb(220,220,220)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  valueDiabled: {
    color: 'rgb(220,220,220)',
    cursor: 'not-allowed'
  },
  dropdownList: {
    background: 'white',
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.1)',
    maxHeight: 200,
    overflow: 'auto',
    position: 'absolute',
    width: 220,
    zIndex: 2
  },
  dropdownItem: {
    cursor: 'pointer',
    fontSize: 12,
    padding: '5px 15px',
  },
  dropdownToggle: {
    background: 'rgba(0,0,0,0.09)',
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1
  }
})