import * as React from 'react'
import { Link } from 'react-router-dom'

const ToolbarMenuItem = (props) => {
  const { onClick, title, to } = props

  return (
    <div>
      {
        (() => {
          if (to) {
            return <a href={to} onClick={onClick}>{title}</a>
          } else {
            return <span onClick={onClick}>{title}</span>
          }
        })()
      }
    </div>
  )
}

export default ToolbarMenuItem