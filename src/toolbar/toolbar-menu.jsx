import * as React from 'react'
import { Link } from 'react-router-dom'
import { stylesheet, classes } from 'typestyle'

class ToolbarMenu extends React.Component {
    state = {
      isOpen: false
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
        isOpen
      } = this.state

      return (
        <div className={ CLASSNAMES.menuWrapper }
          onMouseEnter={ () => { this.setState({ isOpen: true }) } }
          onMouseLeave={ () => { this.setState({ isOpen: false }) } }
        >
          {
            (() => {
              if (to) {
                return (
                  <Link 
                    to={ to }
                    onClick={ onClick }
                  >
                    <div className={CLASSNAMES.menuLabel }>
                      { heading }
                      { !submenu && <i className={classes('material-icons', CLASSNAMES.hoverArrow)}>keyboard_arrow_down</i> }
                      { submenu && <i className={ 'material-icons' }>arrow_right</i> }
                    </div>
                  </Link>
                )
              }
              return (
                <div
                  className={CLASSNAMES.menuLabel }
                  onClick={ onClick }
                >
                  { heading }
                  { !submenu && <i className={classes('material-icons', CLASSNAMES.hoverArrow)}>keyboard_arrow_down</i> }
                  { submenu && <i className={ 'material-icons' }>arrow_right</i> }
                </div>
              )
            })()
          }
          
          <div
            className={ CLASSNAMES.menuList }
            style={{
              display: !isOpen && 'none',
              left: submenu && offset,
              maxHeight,
              overflow: maxHeight && 'auto',
              top: submenu && 0, 
              width,
            }}
          >
            { this.props.children }
          </div>
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
  hoverArrow: {
    fontSize: 18,
    marginLeft: 5,
    color: 'rgb(160,160,160)'
  }
})