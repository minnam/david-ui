import * as React from 'react'

class ToolbarMenu extends React.Component {
    state = {
      toggled: false
    }

    render () {
      const {
        heading,
        submenu = false,
        offset,
        onClick,
        maxHeight,
        width,
        to
      } = this.props
      const {
        toggled
      } = this.state

      return (
        // wrapper
        <div
          onMouseEnter={ () => { this.setState({ toggled: !toggled }) } }
          onMouseLeave={ () => { this.setState({ toggled: !toggled }) } }
        >
          {/* header */}
          <div style={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div>
              {
                (() => {
                  if (to) {
                    return <a href={to} onClick={onClick}>{heading}</a>
                  } else {
                    return <span onClick={onClick}>{heading}</span>
                  }
                })()
              }
              { submenu && <i className="material-icons">arrow_right</i> }
            </div>
            {/* children / items / submenus */}
            { toggled &&
              <div
                style={{
                  // left: alignLeft && width,
                  whiteSpace: 'nowrap',
                  left: submenu && offset,
                  top: submenu && 0, 
                  background: 'white',
                  position: 'absolute',
                  width: width,
                  padding: '10px',
                  fontSize: 12,
                  cursor: 'pointer',
                  maxHeight: maxHeight,
                  overflow: maxHeight && 'auto'

                }}
              >
                { this.props.children }
              </div>

            }
          </div>
        </div>
      )
    }
}

export default ToolbarMenu