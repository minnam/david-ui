/**
 * modules/toolbar/toolbar-title-container.jsx
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
import { stylesheet } from 'typestyle'

/* <ToolbarTitleContainer /> ==================================================================== */
const ToolbarTitleContainer = (props: {
  children: [React.Node]
}) => {
  const { children } = props

  return (
    <span className={ CLASSNAMES.titleContainer }>
      {
        children.map ? children.map((element, key) => {
          return (
            <span
              className={ CLASSNAMES.titleContainerItem }
              key={key}
            >
              {element}
              {
                (() => {
                  if (key < children.length - 1) {
                    if (!element.props.exclude)
                      return <i className="material-icons">keyboard_arrow_right</i>
                  }
                })()
              }
            </span>
          )
        }) : children
      }
    </span>
  )
}
export default ToolbarTitleContainer

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  titleContainerItem: {
    alignItems: 'center',
    display: 'flex',
  }
})