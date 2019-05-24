import * as React from 'react'
import { stylesheet } from 'typestyle'

class ToolbarMenu extends React.Component {
    state = {
      toggled: false
    }

    render () {
      const {
        heading,
        maxHeight,
        offset,
        onClick,
        submenu = false,
        to,
        width
      } = this.props
      const {
        toggled
      } = this.state

      return (
        <div className={ CLASSNAMES.menuWrapper }
          onMouseEnter={ () => { this.setState({ toggled: true }) } }
          onMouseLeave={ () => { this.setState({ toggled: false }) } }
        >
          <div className={ CLASSNAMES.menuLabel }>
            {
              (() => {
                if (to) {
                  return <a href={ to } onClick={ onClick }>{ heading }</a>
                }
                return <span onClick={ onClick }>{ heading }</span>
              })()
            }
            { submenu && <i className={ 'material-icons' }>arrow_right</i> }
          </div>
          { toggled &&
            <div
              className={ CLASSNAMES.menuList }
              style={{
                left: submenu && offset,
                maxHeight,
                overflow: maxHeight && 'auto',
                top: submenu && 0, 
                width,

              }}
            >
              { this.props.children }
            </div>

          }
        </div>
      )
    }
}

export default ToolbarMenu

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  menuWrapper: {
    position: 'relative',
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        background: 'rgb(240,240,240)' 
      },
    }
  },
  menuLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuList: {
    background: 'white',
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    fontSize: 12,
    position: 'absolute',
    whiteSpace: 'nowrap',
    $nest: {
      '&>*': {
        padding: '5px 5px 5px 15px',
      },
    }
  },
})