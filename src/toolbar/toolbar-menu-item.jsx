import * as React from 'react'
import { Link } from 'react-router-dom'
import { style } from 'typestyle'

const ToolbarMenuItem = (props) => {
  const { onClick, content, to } = props
  const menuItem = style({
    $nest: {
      '&:hover': { background: 'rgb(240,240,240)' }
    } 
  })
  
  if (to) {
    return <Link className={ menuItem } style={{ display: 'block' }} to={ to } onClick={ onClick }>{ content }</Link>
  }
  return <div className={ menuItem } onClick={ onClick }>{ content }</div>
}

export default ToolbarMenuItem